using System.Text.Json;
using backend;

public class LoginUser
{
    private readonly AuthenticationUtils _authenticator;

    public LoginUser()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async Task HandleLoginRequest(HttpContext context)
    {
        try
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
            bool isTeacher = IsTeacherEnv.Value.Contains(email);
            // Call AuthenticateUser method on the AuthenticationUtils instance with register=false
            var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
                false,
                null,
                email,
                password,
                null,
                isTeacher
            );

            if (AreCredentialsCorrect)
            {
                // Generate a JWT token
                string token = JwtUtils.GenerateJwt("", email, isTeacher);
                if (!string.IsNullOrWhiteSpace(token))
                {
                    // Return a successful response with a 200 status code
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
                // Return an error response with a 401 status code
                var response = new { error = new { message = messageToUser } };
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(response);
            }
        }
        catch (Exception ex)
        {
            // Send an error message to the client
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = ex.Message }));
        }
    }
}
