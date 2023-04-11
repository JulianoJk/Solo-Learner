public class ProfileController
{
    public static async Task GetProfile(HttpContext context)
    {
        var response = new { message = "Hello! This is the profile!" };
        context.Response.StatusCode = StatusCodes.Status409Conflict;
        await context.Response.WriteAsJsonAsync(response);
    }
}
