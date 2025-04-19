using backend;
using System.Text.Json;

public class AccountDeletionController
{
    private readonly AuthenticationUtils _authenticationUtils;
    private readonly Database _database;

    public AccountDeletionController()
    {
        _authenticationUtils = new AuthenticationUtils();
        _database = new Database();
    }

    public async Task InitAccountDeletion(HttpContext context)
    {
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        if (string.IsNullOrEmpty(requestBody))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Request body cannot be empty.");
            return;
        }

        var deleteAccountModel = JsonSerializer.Deserialize<DeleteAccountModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        string email = deleteAccountModel.Email;
        string password = deleteAccountModel.Password;

        await DeleteUserAsync(context, email, password);
    }

    private async Task DeleteUserAsync(HttpContext context, string email, string password)
    {
        int? id = JwtUtils.GetUserId(email);
        string? userEmailFromJWT = JwtUtils.GetUserEmailFromJwt(context);
        bool isTeacher = JwtUtils.GetIsTeacher(context);
        bool isStudent = !isTeacher;

        var (areCredentialsCorrect, messageToUser) = _authenticationUtils.AuthenticateUser(
            isRegister: false,
            isGoogle: false,
            username: null,
            firstName: null,
            middleName: null,
            lastName: null,
            gender: null,
            email: email,
            password: password,
            salt: null,
            isTeacher: isTeacher,
            isStudent: isStudent,
            picture: null,
            phoneNumber: null,
            countryName: null,
            countryFlag: null,
            mustChangePassword: false
        );

        if (!areCredentialsCorrect || userEmailFromJWT != email)
        {
            var response = new { error = new { message = messageToUser } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
            return;
        }

        bool isDeleted = await _database.DeleteUserByIdAsync(id);

        if (!isDeleted)
        {
            var response = new
            {
                error = new { message = "Internal Server Error. Could not delete account." }
            };
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            var response = new { message = "Account deleted. We're sorry to see you go! :(" };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
