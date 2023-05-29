using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using backend;

public class AdminController
{
    public async Task GetDashboard(HttpContext context)
    {
        var response = new { status = "success", data = new { message = "Admin dashboard" } };
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(response);
    }
}
