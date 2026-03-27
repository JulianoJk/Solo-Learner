using backend.Models;
using Npgsql;

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
        NpgsqlConnection connection = new NpgsqlConnection(ConnectionString.Value);

        try
        {
            await connection.OpenAsync();

            NpgsqlCommand command = new NpgsqlCommand(
                "SELECT id, email, username, \"isAdmin\", \"isTeacher\", created_at, updated_at, \"lastActive\", picture, \"isUserLoggedIn\" FROM users",
                connection
            );
            await using var reader = await command.ExecuteReaderAsync();

            List<User> users = new List<User>();

            while (reader.Read())
            {
                User user = new User
                {
                    Id = (int)reader["id"],
                    Email = (string)reader["email"],
                    Username = (string)reader["username"],
                    IsAdmin = (bool)reader["isAdmin"],
                    IsTeacher = (bool)reader["isTeacher"],
                    Picture = reader["picture"] == DBNull.Value ? null : (string)reader["picture"],
                    CreatedAt = ((DateTime)reader["created_at"]).ToString("yyyy-MM-dd"),
                    UpdatedAt = ((DateTime)reader["updated_at"]).ToString("yyyy-MM-dd"),
                    LastActive = (DateTime)reader["lastActive"],
                    IsUserLoggedIn = (bool)reader["isUserLoggedIn"]
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
