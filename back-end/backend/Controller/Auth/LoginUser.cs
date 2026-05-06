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
            string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

            var loginModel = JsonSerializer.Deserialize<LoginModel>(
                requestBody,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
            );

            if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.Email) || string.IsNullOrWhiteSpace(loginModel.Password))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = new { message = "Email and password are required." } });
                return;
            }

            string email = loginModel.Email;
            string password = loginModel.Password;

            bool isTeacher = IsTeacherEnv.Value.Contains(email);
            bool isStudent = !isTeacher;

            // Call AuthenticateUser with updated parameters (only login-required fields provided)
            var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
                isRegister: false,
                isGoogle: false,
                username: null,
                firstName: "",
                middleName: "",
                lastName: "",
                gender: "",
                email: email,
                password: password,
                salt: null,
                isTeacher: isTeacher,
                isStudent: isStudent,
                isAdmin: false,
                picture: null,
                phoneNumber: null,
                countryName: null,
                countryFlag: null,
                mustChangePassword: false
            );

            if (AreCredentialsCorrect)
            {
                UserDataAccess usernameDataAccess = new UserDataAccess();
                UserRepository userRepository = new UserRepository();
                string username = usernameDataAccess.GetUsername(email);

                var db = new Database();
                bool isAdmin = db.GetIsAdminFromDatabase(email);

                string token = JwtUtils.GenerateJwt(username, email, isTeacher, isStudent, isAdmin);
                if (!string.IsNullOrWhiteSpace(token))
                {
                    await userRepository.UpdateUserIsLoggedIn(true, email);

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
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    await context.Response.WriteAsJsonAsync(new
                    {
                        error = "Internal Server Error. JWT token not generated."
                    });
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new
                {
                    error = new { message = messageToUser }
                });
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = ex.Message }));
        }
    }
}
