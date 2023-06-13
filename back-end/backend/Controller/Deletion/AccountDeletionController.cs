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
        // Read the request body
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        if (string.IsNullOrEmpty(requestBody))
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Request body cannot be empty.");
            return;
        }

        // Deserialize the request body into a DeleteModel object
        var deleteAccountModel = JsonSerializer.Deserialize<DeleteAccountModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        // Extract the email, username, password, and confirm password from the DeleteModel object
        string email = deleteAccountModel.Email;
        string password = deleteAccountModel.Password;
        await DeleteUserAsync(context, email, password);
    }

    private async Task DeleteUserAsync(HttpContext context, string email, string password)
    {
        // Verify the JWT token and extract the user ID
        var id = JwtUtils.GetUserId(email);
        var userEmailFromJWT = JwtUtils.GetUserEmailFromJwt(context);
        var isTeacher = JwtUtils.GetIsTeacher(context);

        // Authenticate the user with the provided email and password
        var (areCredentialsCorrect, messageToUser) = _authenticationUtils.AuthenticateUser(
            false,
            null,
            email,
            password,
            null,
            isTeacher,
            false
        );

        if (!areCredentialsCorrect || userEmailFromJWT != email)
        {
            // Return an error response with a 401(Unauthorized) status code
            var response = new { error = new { message = messageToUser } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
            return;
        }

        // Delete the user account
        bool isDeleted = await _database.DeleteUserByIdAsync(id);

        if (!isDeleted)
        {
            // Return an error response with a 500(Internal Server Error) status code
            var response = new
            {
                error = new { message = "Internal Server Error. Could not delete account." }
            };
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            // Return a success response with a 200 OK status code
            var response = new { message = "Account deleted. We're sorry to see you go! :(" };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
