using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using backend;

public class RegisterUser
{
    private readonly AuthenticationUtils _authenticator;

    public RegisterUser()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async Task HandleRegistrationRequest(HttpContext context)
    {
        UserRepository userRepository = new UserRepository();
        // Read the request body
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        // Deserialize the request body into a RegisterModel object
        var registerModel = JsonSerializer.Deserialize<RegisterModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        // Extract the email, username, password, and confirm password from the RegisterModel object
        string email = registerModel.Email;
        string firstName = registerModel.FirstName;
        string lastName = registerModel.LastName;
        string gender = registerModel.Gender;
        string username = registerModel.Username;
        string password = registerModel.Password;
        string confirmPassword = registerModel.ConfirmPassword;
        bool isTeacher = IsTeacherEnv.Value.Contains(email);

        if (IsValidEmail(email) && ArePasswordsEqual(password, confirmPassword))
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                if (registerModel.isTeacher)
                {
                    isTeacher = registerModel.isTeacher;
                }

                // Generate a unique username based on the email
                username = GetDefaultUsername(email);


                if (username == null)
                {
                    // Return an error response with a 409 status code
                    var response = new
                    {
                        error = new { message = "Unable to generate a unique username." },
                        status = "error"
                    };
                    context.Response.StatusCode = StatusCodes.Status409Conflict;
                    await context.Response.WriteAsJsonAsync(response);
                    return;
                }

                var (isTaken, newUsername) = _authenticator.IsUsernameTaken(username);
                for (int counter = 1; isTaken; counter++)
                {
                    // Append a counter to the username and check if it is taken
                    username = $"{username}{counter}";
                    (isTaken, newUsername) = _authenticator.IsUsernameTaken(username);
                }
            }
            else
            {
                var (isTaken, newUsername) = _authenticator.IsUsernameTaken(username);
                if (isTaken)
                {
                    // Return an error response with a 409 status code
                    var response = new
                    {
                        error = new { message = "Username is already taken." },
                        status = "error"
                    };
                    context.Response.StatusCode = StatusCodes.Status409Conflict;
                    await context.Response.WriteAsJsonAsync(response);
                    return;
                }

                if (string.IsNullOrWhiteSpace(gender))
                {
                    // Return an error response with a 400 status code
                    var response = new
                    {
                        error = new { message = "Gender can not be empty" },
                        status = "error"
                    };
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(response);
                    return;
                }
                //TODO!: Make it required
                // if (!string.IsNullOrWhiteSpace(firstName) || !(firstName is string))
                // {
                //     var response = new
                //     {
                //         error = new { message = "First name should be string" },
                //         status = "error"
                //     };
                //     context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                //     await context.Response.WriteAsJsonAsync(response);
                //     return;
                // }
                //
                // if (!string.IsNullOrWhiteSpace(lastName) && !(lastName is string))
                // {
                //     var response = new
                //     {
                //         error = new { message = "Last name should be string" },
                //         status = "error"
                //     };
                //     context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                //     await context.Response.WriteAsJsonAsync(response);
                //     return;
                // }


                if (string.IsNullOrWhiteSpace(gender))
                {
                    // Return an error response with a 400 status code
                    var response = new
                    {
                        error = new { message = "Gender can not be empty" },
                        status = "error"
                    };
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(response);
                    return;
                }
            }

            // Generate a salt
            byte[] salt = GenerateSalt();

            // Hash the password
            byte[] hash = _authenticator.GenerateHash(password, salt);

            if (salt?.Length > 0)
            {
                // Call AuthenticateUser method on the AuthenticationUtils instance with register=true
                var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
                    true,
                    false,
                    username,
                    firstName,
                    lastName,
                    gender,
                    email,
                    Convert.ToBase64String(hash),
                    salt,
                    isTeacher,
                    null
                );
                if (AreCredentialsCorrect)
                {
                    // Generate a JWT token
                    string token = JwtUtils.GenerateJwt(username, email, isTeacher, false);

                    // Check if the token was generated
                    if (!string.IsNullOrWhiteSpace(token))
                    {
                        await userRepository.UpdateUserIsLoggedIn(true, email);

                        // Return a successful response with a 200 status code and JWT token
                        var response = new { messageToUser, token };
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsJsonAsync(response);
                    }
                    else
                    {
                        // Return an error response with a 500(Internal Server Error) status code
                        var response = new
                        {
                            status = "error",
                            data = new { message = "Internal Server Error." },
                            issue = new { issue = "JWT token not generated." }
                        };
                        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        await context.Response.WriteAsJsonAsync(response);
                    }
                }
                else
                {
                    // Return an error response with a 409 status code
                    var response = new { error = new { message = messageToUser } };
                    context.Response.StatusCode = StatusCodes.Status409Conflict;
                    await context.Response.WriteAsJsonAsync(response);
                }
            }
            else
            {
                // Return an error response with a 500(Internal Server Error) status code
                var response = new
                {
                    status = "error",
                    data = new { message = "Internal Server Error." },
                    issue = new { issue = "Salt not generated" }
                };
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsJsonAsync(response);
            }
        }
        else if (!IsValidEmail(email))
        {
            // Return an error response with a 400(Bad Request) status code
            var response = new
            {
                status = "error",
                data = new { message = "Invalid email address" },
                issue = new { issue = "email" }
            };
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(response);
        }
        else if (!ArePasswordsEqual(password, confirmPassword))
        {
            // Return an error response with a 400(Bad Request) status code
            var response = new
            {
                status = "error",
                data = new { message = "The passwords do not match." },
                issue = new { issue = "confirmPassword" }
            };
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(response);
        }
    }

    private static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            // If email is null or empty, it is not valid
            return false;
        }

        if (!email.Contains('@'))
        {
            // If email does not contain an '@' character, it is not valid
            return false;
        }

        var emailParts = email.Split('@');

        if (emailParts.Length != 2)
        {
            // If email does not have exactly one '@' character, it is not valid
            return false;
        }

        var domain = emailParts[1];

        if (string.IsNullOrWhiteSpace(domain))
        {
            // If the domain part of the email is null or empty, it is not valid
            return false;
        }

        if (!domain.Contains('.'))
        {
            // If the domain part of the email does not contain a '.' character, it is not valid
            return false;
        }

        return true;
    }

    private static bool ArePasswordsEqual(string password, string confirmPassword)
    {
        if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(confirmPassword))
        {
            // If either password or confirmPassword is null or empty, they are not equal
            return false;
        }

        return password == confirmPassword;
    }

    private static string GetDefaultUsername(string email)
    {
        int atIndex = email.IndexOf('@');

        if (atIndex >= 0)
        {
            return email.Substring(0, atIndex);
        }
        else
        {
            return email;
        }
    }

    private byte[]? GenerateSalt()
    {
        _ = new byte[64];

        try
        {
            return RandomNumberGenerator.GetBytes(64);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating salt: {ex.Message}");
            return null;
        }
    }
}