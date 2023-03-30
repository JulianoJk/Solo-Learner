using System.Text.Json;
using backend;

public class LoginUser
{
    private readonly AuthenticationUtils _authenticator;

    public LoginUser()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async void HandleLoginRequest(HttpContext context)
    {
        // Read the request body
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        // Deserialize the request body into a LoginModel object
        var loginModel = JsonSerializer.Deserialize<LoginModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        // Extract the email and password from the LoginModel object
        string email = loginModel.Email;
        string password = loginModel.Password;

        // Call AuthenticateUser method on the AuthenticationUtils instance with register=false
        var (loginStatus, messageToUser) = _authenticator.AuthenticateUser(
            false,
            null,
            email,
            password,
            null
        );

        if (loginStatus)
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
}
