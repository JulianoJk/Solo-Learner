using System.Text.Json;
using backend;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

public class RegisterUser
{
    private readonly AuthenticationUtils _authenticator;

    public RegisterUser()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async void HandleRegistrationRequest(HttpContext context)
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
            // Generate a random salt value
            byte[] salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            // Append the salt value to the password
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltedPasswordBytes = new byte[passwordBytes.Length + salt.Length];
            Array.Copy(passwordBytes, saltedPasswordBytes, passwordBytes.Length);
            Array.Copy(salt, 0, saltedPasswordBytes, passwordBytes.Length, salt.Length);

            // Hash the salted password
            byte[] hashedPasswordBytes = new SHA256Managed().ComputeHash(saltedPasswordBytes);
            string hashedPassword = Convert.ToBase64String(hashedPasswordBytes);
            Console.WriteLine(hashedPassword);
            // Call AuthenticateUser method on the AuthenticationUtils instance with register=true
            var (registerStatus, messageToUser) = _authenticator.AuthenticateUser(
                true,
                username,
                email,
                hashedPassword
            );

            if (registerStatus)
            {
                // Return a successful response with a 200 status code
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsJsonAsync(messageToUser);
            }
            else
            {
                // Return an error response with a 401 status code
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(messageToUser);
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
            // If email contains more than one '@' character, it is not valid
            return false;
        }

        if (string.IsNullOrWhiteSpace(emailParts[0]) || string.IsNullOrWhiteSpace(emailParts[1]))
        {
            // If the local or domain part of the email is null or empty, it is not valid
            return false;
        }

        if (emailParts[0].Length > 64 || emailParts[1].Length > 255)
        {
            // If the local or domain part of the email is too long, it is not valid
            return false;
        }

        try
        {
            var mailAddress = new System.Net.Mail.MailAddress(email);
            return true;
        }
        catch
        {
            // If the email is not in a valid format according to .NET's MailAddress class, it is not valid
            return false;
        }
    }

    private bool ArePasswordsEqual(string password, string confirmPassword)
    {
        return !string.IsNullOrWhiteSpace(confirmPassword)
            && string.Equals(password, confirmPassword);
    }

    // This method returns a default username based on the provided email and username.
    private string GetDefaultUsername(string email)
    {
        if (!string.IsNullOrWhiteSpace(email))
        {
            int index = email.IndexOf('@');
            if (index > 0)
            {
                return email.Substring(0, index);
            }
        }

        return null;
    }
}
