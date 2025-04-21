using backend.Models;
using MySql.Data.MySqlClient;
using backend.Models;

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
                "SELECT id, email, username, firstName, middleName, lastName, countryName, countryFlag, phoneNumber, isAdmin, isTeacher, isStudent, created_at, updated_at, lastActive, picture, isUserLoggedIn FROM users",
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
                     FirstName = reader["firstName"] == DBNull.Value ? null : reader.GetString("firstName"),
                    MiddleName = reader["middleName"] == DBNull.Value ? null : reader.GetString("middleName"),
                    LastName = reader["lastName"] == DBNull.Value ? null : reader.GetString("lastName"),
                    Phone = reader["phoneNumber"] == DBNull.Value ? null : reader.GetString("phoneNumber"),
                    Country = new Country
                    {
                        Name = reader["countryName"] == DBNull.Value ? null : reader.GetString("countryName"),
                        Flag = reader["countryFlag"] == DBNull.Value ? null : reader.GetString("countryFlag")
                    },
                    IsAdmin = reader.GetBoolean("isAdmin"),
                    IsTeacher = reader.GetBoolean("isTeacher"),
                    IsStudent = reader.GetBoolean("isStudent"),      
                    Picture =
                        reader["picture"] == DBNull.Value ? null : reader.GetString("picture"),
                    CreatedAt = reader.GetDateTime("created_at").ToString("yyyy-MM-dd"),
                    UpdatedAt = reader.GetDateTime("updated_at").ToString("yyyy-MM-dd"),
                    LastActive = reader.GetDateTime("lastActive"),
                    IsUserLoggedIn = reader.GetBoolean("isUserLoggedIn")
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
