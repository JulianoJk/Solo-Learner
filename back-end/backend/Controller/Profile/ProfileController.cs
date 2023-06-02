using backend;
using MySql.Data.MySqlClient;
using System.Text.Json;
using backend.Models;

public class ProfileController
{
    // Method to retrieve a user's data from the database based on their email
    public async Task<User?> GetUserFromDatabase(string email)
    {
        MySqlConnection connection = new MySqlConnection(ConnectionString.Value);
        MySqlCommand command = new MySqlCommand(
            $"SELECT * FROM users WHERE email = '{email}'",
            connection
        );
        await connection.OpenAsync();
        MySqlDataReader reader = command.ExecuteReader();
        if (reader.HasRows)
        {
            reader.Read();
            bool isTeacher = (bool)reader["isTeacher"];
            bool IsAdmin = (bool)reader["isAdmin"];

            User user = new User
            {
                Id = (int)reader["id"],
                Username = (string)reader["username"],
                IsTeacher = isTeacher,
                IsAdmin = IsAdmin,
                CreatedAt = ((DateTime)reader["created_at"]).ToString("yy-MM-dd")
            };
            reader.Close();
            return user;
        }
        reader.Close();
        return null;
    }

    public async Task GetProfile(HttpContext context)
    {
        // Retrieve the user ID from the JWT
        var userId = JwtUtils.GetUserEmailFromJwt(context);

        // Retrieve the user information from the database
        var user = await GetUserFromDatabase(userId);

        // Create a response object with the username and role information
        var response = new
        {
            status = "success",
            username = user.Username,
            isTeacher = user.IsTeacher,
            isAdmin = user.IsAdmin,
            createdAt = user.CreatedAt,
        };

        // Set the response status code and return the response object as JSON
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(response);
    }

    public async Task ChangeUsernameAsync(HttpContext context)
    {
        await UpdateUsernameByEmailAsync(context);
    }

    private async Task UpdateUsernameByEmailAsync(HttpContext context)
    {
        MySqlConnection connection = new MySqlConnection(ConnectionString.Value);

        // Read the request body
        string requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

        if (string.IsNullOrEmpty(requestBody))
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Request body cannot be empty.");
        }

        // Deserialize the request body into a RegisterModel object
        var registerModel = JsonSerializer.Deserialize<RegisterModel>(
            requestBody,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
        );

        // Extract the email and new username from the RegisterModel object
        string email = registerModel.Email;
        string newUsername = registerModel.Username;

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(newUsername))
        {
            // Return an error response with a 400(Bad Request) status code
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("Email and new username cannot be empty.");
        }

        try
        {
            await connection.OpenAsync();

            // Check if the email exists in the database
            MySqlCommand checkEmailCommand = new MySqlCommand(
                "SELECT COUNT(*) FROM users WHERE email = @email",
                connection
            );
            checkEmailCommand.Parameters.AddWithValue("@email", email);
            long emailCount = (long)await checkEmailCommand.ExecuteScalarAsync();

            if (emailCount == 0)
            {
                // Return an error response with a 404(Not Found) status code
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsJsonAsync("Email does not exist.");
            }

            // Update the username for the email in the database
            MySqlCommand command = new MySqlCommand(
                "UPDATE users SET username = @newUsername WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@newUsername", newUsername);
            command.Parameters.AddWithValue("@email", email);

            int rowsAffected = await command.ExecuteNonQueryAsync();

            if (rowsAffected > 0)
            {
                var response = new { message = $"Name successfully changed to '{newUsername}'" };
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsJsonAsync(response);
            }
            else
            {
                // Return an error response with a 500(Internal Server Error) status code
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsJsonAsync(
                    "An error occurred while updating the username."
                );
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        finally
        {
            await connection.CloseAsync();
        }
    }
}
