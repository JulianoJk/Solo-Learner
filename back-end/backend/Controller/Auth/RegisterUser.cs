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
        // Read the request body
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        // Deserialize the request body into a RegisterModel object
        var registerModel = JsonSerializer.Deserialize<RegisterModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        // Extract the email, username, password, and confirm password from the RegisterModel object
        string email = registerModel.Email;
        string username = registerModel.Username;
        string password = registerModel.Password;
        string confirmPassword = registerModel.ConfirmPassword;

        if (IsValidEmail(email) && ArePasswordsEqual(password, confirmPassword))
        {
            // If username is null, use the email or whatever is before @ as the default username
            if (string.IsNullOrWhiteSpace(username))
            {
                username = GetDefaultUsername(email);
            }

            // Generate a salt
            byte[] salt = GenerateSalt();

            // Hash the password
            byte[] hash = _authenticator.GenerateHash(password, salt);

            if (salt != null && salt.Length > 0)
            {
                // Call AuthenticateUser method on the AuthenticationUtils instance with register=true
                var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
                    true,
                    username,
                    email,
                    Convert.ToBase64String(hash),
                    salt
                );
                if (AreCredentialsCorrect)
                {
                    // Generate a JWT token
                    string token = JwtUtils.GenerateJwt(username, email);

                    // Check if the token was generated
                    if (!string.IsNullOrWhiteSpace(token))
                    {
                        // Return a successful response with a 200 status code and JWT token
                        var response = new { messageToUser, token };
                        context.Response.StatusCode = StatusCodes.Status200OK;
                        await context.Response.WriteAsJsonAsync(response);
                    }
                    else
                    {
                        // Return an error response with a 500(Internal Server Error) status code
                        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        await context.Response.WriteAsJsonAsync(
                            "Internal Server Error. JWT token not generated."
                        );
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
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsJsonAsync(
                    "Internal Server Error.{Salt not generated}"
                );
            }
        }
        else if (!IsValidEmail(email))
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Invalid email address.");
        }
        else if (!ArePasswordsEqual(password, confirmPassword))
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("The passwords do not match.");
        }
    }

    private bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            // If email is null or empty, it is not valid
            return false;
        }

        if (!email.Contains("@"))
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

        if (!domain.Contains("."))
        {
            // If the domain part of the email does not contain a '.' character, it is not valid
            return false;
        }

        return true;
    }

    private bool ArePasswordsEqual(string password, string confirmPassword)
    {
        if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(confirmPassword))
        {
            // If either password or confirmPassword is null or empty, they are not equal
            return false;
        }

        return password == confirmPassword;
    }

    private string GetDefaultUsername(string email)
    {
        var emailParts = email.Split('@');

        return emailParts[0];
    }

    private byte[] GenerateSalt()
    {
        byte[] salt = new byte[64];

        try
        {
            salt = RandomNumberGenerator.GetBytes(64);
            return salt;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating salt: {ex.Message}");
            return null;
        }
    }
}
