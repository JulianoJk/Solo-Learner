using System.Text.Json;
using backend;

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
        var registerModel = JsonSerializer.Deserialize<RegisterModel>(requestBody, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        // Extract the email, username, password, and confirm password from the RegisterModel object
        string email = registerModel.Email;
        string username = registerModel.Username;
        string password = registerModel.Password;
        string confirmPassword = registerModel.ConfirmPassword;

        if (ArePasswordsEqual(password, confirmPassword))
        {
            // Call AuthenticateUser method on the AuthenticationUtils instance with register=true
            var (registerStatus, messageToUser) =
                _authenticator.AuthenticateUser(true, username, email, password);

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
        else
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("The passwords do not match.");
        }
    }

    private bool ArePasswordsEqual(string password, string confirmPassword)
    {
        return password == confirmPassword;
    }
}