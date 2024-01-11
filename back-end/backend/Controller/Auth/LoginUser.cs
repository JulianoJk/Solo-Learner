using System.Text.Json;
using backend;

public class LoginUser
{
    private readonly AuthenticationUtils _authenticator;
    private readonly AuthenticationManager _authenticationManager;

    public LoginUser()
    {
        _authenticator = new AuthenticationUtils();
        _authenticationManager = new AuthenticationManager();
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
                false,
                null,
                null,
                null,
                null,
                email,
                password,
                null,
                isTeacher,
                null
            );

            if (AreCredentialsCorrect)
            {
                UserDataAccess usernameDataAccess = new UserDataAccess();
                UserRepository userRepository = new UserRepository();
                string username = usernameDataAccess.GetUsername(email);

                // Get the isAdmin value from the database for this user
                var db = new Database();
                bool isAdmin = db.GetIsAdminFromDatabase(email);

                // Generate a JWT token
                string token = JwtUtils.GenerateJwt(username, email, isTeacher, isAdmin);
                if (!string.IsNullOrWhiteSpace(token))
                {
                    // Update user status in the database (isUserLoggedIn = true)
                    await userRepository.UpdateUserIsLoggedIn(true, email);
                    // Return a successful response with a 200 status code
                    var response = new
                    {
                        messageToUser,
                        token,
                        navigateUser = JwtUtils.GetUserLastVisitedPath(email)
                    };
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
