using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend;

public class AdminAccountDeletionController
{
    private readonly AuthenticationUtils _authenticationUtils;
    private readonly Database _database;

    public AdminAccountDeletionController()
    {
        _authenticationUtils = new AuthenticationUtils();
        _database = new Database();
    }

    public async Task AdminDeleteUserAsync(HttpContext context, string userId)
{
    // Check if userId is null or empty
    if (string.IsNullOrEmpty(userId))
    {
        // Return an error response with a 400 (Bad Request) status code
        var response = new { error = new { message = "Invalid user ID." } };
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(response);
        return;
    }

    // Attempt to parse userId into an integer
    if (!int.TryParse(userId, out int userIdInt))
    {
        // Return an error response with a 400 (Bad Request) status code
        var response = new { error = new { message = "Invalid user ID format." } };
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(response);
        return;
    }

    // Verify the JWT token and check if the user is an admin
    bool isValidJwt = JwtUtils.authenticateJwt(context);
    bool isAdmin = JwtUtils.GetUserIsAdmin(context);

    if (!isValidJwt || !isAdmin)
    {
        // Return an error response with a 401 (Unauthorized) status code
        var response = new { error = new { message = "Unauthorized" } };
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(response);
        return;
    }

    // Delete the user account
    bool isDeleted = await _database.AdminDeleteUserByIdAsync(userIdInt);

    if (!isDeleted)
    {
        // Return an error response with a 500 (Internal Server Error) status code
        var response = new { error = new { message = "Internal Server Error. Could not delete account." } };
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(response);
    }
    else
    {
        // Return a success response with a 200 OK status code
        var response = new { message = "User account deleted successfully." };
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(response);
    }
}

    public async Task InitAccountDeletion(HttpContext context)
    {
        try
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
            var deleteAccountModel = JsonSerializer.Deserialize<AdminDeleteAccountModel>(
                requestBody,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
            );
            
            string userId = deleteAccountModel.Id;
            Console.WriteLine(userId);
            await AdminDeleteUserAsync(context, userId);
        }
        catch (JsonException)
        {
            // Handle JSON deserialization error
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Invalid JSON format in the request body.");
        }
    }
}