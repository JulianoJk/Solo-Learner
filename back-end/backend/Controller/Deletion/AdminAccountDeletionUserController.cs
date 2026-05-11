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

    private async Task DeleteUsersInternalAsync(HttpContext context, List<int> userIds)
    {
        if (userIds == null || userIds.Count == 0)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new { message = "Invalid user IDs." });
            return;
        }

        var isValidJwt = JwtUtils.AuthenticateJwt(context);
        var isAdmin = JwtUtils.GetUserIsAdmin(context);

        if (!isValidJwt || !isAdmin)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(new { message = "Unauthorized access" });
            return;
        }

        try
        {
            var isDeleted = await _database.AdminDeleteUserByIdAsync(userIds);

            if (!isDeleted)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(new { message = "Delete failed" });
                return;
            }

            context.Response.StatusCode = 200;
            await context.Response.WriteAsJsonAsync(new { message = "Deleted" });
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new { message = "Unexpected error" });
        }
    }
    
    public Task AdminDeleteUserAsync(HttpContext context, int userId)
    {
        return DeleteUsersInternalAsync(context, new List<int> { userId });
    }
    
    public Task AdminDeleteUsersAsync(HttpContext context, List<int> userIds)
    {
        return DeleteUsersInternalAsync(context, userIds);
    }
}
