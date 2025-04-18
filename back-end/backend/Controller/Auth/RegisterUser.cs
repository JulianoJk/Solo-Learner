using System;
using System.IO;
using System.Security.Cryptography;
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
        Database database = new Database();
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        var registerModel = JsonSerializer.Deserialize<RegisterModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        if (registerModel == null)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                status = "error",
                data = new { message = "Invalid registration data." }
            });
            return;
        }

        bool isAdminRegister = context.Request.Path.Value?.Contains("/admin/dashboard") == true;

        string email = registerModel.Email ?? "";
        string firstName = registerModel.FirstName ?? "";
        string middleName = registerModel.MiddleName ?? "";
        string lastName = registerModel.LastName ?? "";
        string gender = registerModel.Gender ?? "";
        string username = registerModel.Username ?? "";
        string password = registerModel.Password ?? "";
        string confirmPassword = registerModel.ConfirmPassword ?? "";
        string phoneNumber = registerModel.PhoneNumber ?? "";
        string countryName = registerModel.Country?.Name ?? "";
        string countryFlag = registerModel.Country?.Flag ?? "";
        string picture = registerModel.Picture ?? "";
        string role = registerModel.Role ?? "";
        var assignedUsers = registerModel.AssignedUsers ?? new List<int>();

        bool isTeacher = role == "Teacher";
        bool isStudent = role == "Student";
        bool isAdmin = role == "Admin";

        if (!IsValidEmail(email))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                status = "error",
                data = new { message = "Invalid email address" },
                issue = new { issue = "email" }
            });
            return;
        }

        if (string.IsNullOrWhiteSpace(gender))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                error = new { message = "Gender cannot be empty" },
                status = "error"
            });
            return;
        }

        if (!isAdminRegister && !ArePasswordsEqual(password, confirmPassword))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                status = "error",
                data = new { message = "The passwords do not match." },
                issue = new { issue = "confirmPassword" }
            });
            return;
        }

        if (string.IsNullOrWhiteSpace(username))
        {
            username = GetDefaultUsername(email);

            var (isTaken, _) = _authenticator.IsUsernameTaken(username);
            for (int counter = 1; isTaken; counter++)
            {
                username = $"{username}{counter}";
                (isTaken, _) = _authenticator.IsUsernameTaken(username);
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                await context.Response.WriteAsJsonAsync(new
                {
                    error = new { message = "Unable to generate a unique username." },
                    status = "error"
                });
                return;
            }
        }
        else
        {
            var (isTaken, _) = _authenticator.IsUsernameTaken(username);
            if (isTaken)
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                await context.Response.WriteAsJsonAsync(new
                {
                    error = new { message = "Username is already taken." },
                    status = "error"
                });
                return;
            }
        }

        byte[]? salt = null;
        byte[]? hash = null;

        if (!isAdminRegister)
        {
            salt = GenerateSalt();
            hash = _authenticator.GenerateHash(password, salt);
        }

        var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
            true,
            false,
            username,
            firstName,
            middleName,
            lastName,
            gender,
            email,
            hash != null ? Convert.ToBase64String(hash) : "",
            salt,
            isTeacher,
            isStudent,
            picture,
            phoneNumber,
            countryName,
            countryFlag
        );

        if (AreCredentialsCorrect)
        {
            if (isAdminRegister && assignedUsers.Count > 0)
            {
                int userId = _authenticator.GetUserIdByEmail(email);
                await database.AssignStudentsToTeacher(userId, assignedUsers);
            }

            string token = JwtUtils.GenerateJwt(username, email, isTeacher, isStudent, isAdmin);
            await userRepository.UpdateUserIsLoggedIn(true, email);
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(new { messageToUser, token });
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await context.Response.WriteAsJsonAsync(new
            {
                error = new { message = messageToUser }
            });
        }
    }

    private static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@')) return false;
        var parts = email.Split('@');
        return parts.Length == 2 && parts[1].Contains('.');
    }

    private static bool ArePasswordsEqual(string? password, string? confirmPassword)
    {
        return !string.IsNullOrWhiteSpace(password) &&
               !string.IsNullOrWhiteSpace(confirmPassword) &&
               password == confirmPassword;
    }

    private static string GetDefaultUsername(string email)
    {
        int atIndex = email.IndexOf('@');
        return atIndex >= 0 ? email.Substring(0, atIndex) : email;
    }

    private byte[]? GenerateSalt()
    {
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
