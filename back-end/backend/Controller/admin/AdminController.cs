using backend.Models;
using MySql.Data.MySqlClient;

public class AdminController
{
    public async Task GetDashboard(HttpContext context)
    {
        var response = new { status = "success", data = new { message = "Admin dashboard" } };
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(response);
    }

    public async Task GetUsers(HttpContext context)
    {
        MySqlConnection connection = new MySqlConnection(ConnectionString.Value);

        try
        {
            await connection.OpenAsync();

            MySqlCommand command = new MySqlCommand(
                "SELECT id, email, username, isAdmin, isTeacher, created_at, updated_at, lastActive FROM users",
                connection
            );
            MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync();

            List<User> users = new List<User>();

            while (reader.Read())
            {
                User user = new User
                {
                    Id = reader.GetInt32("id"),
                    Email = reader.GetString("email"),
                    Username = reader.GetString("username"),
                    IsAdmin = reader.GetBoolean("isAdmin"),
                    IsTeacher = reader.GetBoolean("isTeacher"),
                    CreatedAt = reader.GetDateTime("created_at").ToString("yyyy-MM-dd"),
                    UpdatedAt = reader.GetDateTime("updated_at").ToString("yyyy-MM-dd"),
                    LastActive = reader.GetDateTime("lastActive")
                };

                users.Add(user);
            }

            reader.Close();

            var response = new { status = "success", users };

            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            var response = new
            {
                status = "error",
                message = "An error occurred while retrieving users."
            };
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(response);
        }
        finally
        {
            await connection.CloseAsync();
        }
    }
}
