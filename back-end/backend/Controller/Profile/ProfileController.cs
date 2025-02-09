using backend;
using MySql.Data.MySqlClient;
using System.Text.Json;
using backend.Models;

public class ProfileController
{
    private readonly AuthenticationUtils _authenticator;

    public ProfileController()
    {
        _authenticator = new AuthenticationUtils();
    }

    // Method to retrieve a user's data from the database based on their email
    public async Task<User?> GetUserFromDatabaseByUsername(string username)
    {
        MySqlConnection connection = new(ConnectionString.Value);
        MySqlCommand command =
            new($"SELECT * FROM users WHERE username = '{username}'", connection);
        await connection.OpenAsync();
        MySqlDataReader reader = command.ExecuteReader();
        if (reader.HasRows)
        {
            reader.Read();
            bool isTeacher = (bool)reader["isTeacher"];

            // Check for DBNull before casting isAdmin
            bool isAdmin = DBNull.Value.Equals(reader["isAdmin"]) ? false : (bool)reader["isAdmin"];
            bool isStudent = (bool)reader["isStudent"];
            // Check for DBNull before casting picture
            string picture = DBNull.Value.Equals(reader["picture"])
                ? string.Empty
                : (string)reader["picture"];

            User user =
                new()
                {
                    Id = (int)reader["id"],
                    Username = (string)reader["username"],
                    IsTeacher = isTeacher,
                    IsStudent = (bool)reader["isStudent"],
                    IsAdmin = isAdmin,
                    CreatedAt = ((DateTime)reader["created_at"]).ToString("yy-MM-dd"),
                    Picture = picture
                };
            reader.Close();
            return user;
        }

        reader.Close();
        return null;
    }

    public async Task GetProfile(HttpContext context, string username)
    {
        // Check if JWT is valid
        if (!JwtUtils.AuthenticateJwt(context))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync("Unauthorized.");
            return;
        }

        // Retrieve the user information from the database
        var user = await GetUserFromDatabaseByUsername(username);
        if (user == null)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsJsonAsync(new { error = "User not found." });
            return;
        }

        object response;

        if (user.IsTeacher)
        {
            var teacherInfo = await GetTeacherInfoByStudentId(user.Id);
            if (teacherInfo == null)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsJsonAsync(new { error = "Teacher not found." });
                return;
            }

            // Create a response object with the username, role, and teacher's information
            response = new
            {
                status = "success",
                user,
                teacher = new { teacherInfo }
            };
        }
        else
        {
            // Create a response object with the user information
            response = new { status = "success", user };
        }

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
        MySqlConnection connection = new(ConnectionString.Value);

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

        // Check if the username is already taken
        var (isTaken, uniqueUsername) = _authenticator.IsUsernameTaken(newUsername);

        if (isTaken)
        {
            // Return an error response with a 409 status code
            var response = new { error = new { message = "Username is already taken." } };
            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await context.Response.WriteAsJsonAsync(response);
            return;
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

    public async Task GetTeacherInfoForStudentByUsernameAsync(HttpContext context, string username)
    {
        MySqlConnection connection = new MySqlConnection(ConnectionString.Value);

        await connection.OpenAsync();

        MySqlCommand command = new MySqlCommand(
            $"SELECT id, isStudent FROM users WHERE username = '{username}'",
            connection
        );
        MySqlDataReader reader = command.ExecuteReader();
        if (!reader.HasRows)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsJsonAsync("User not found.");
            return;
        }

        await reader.ReadAsync();
        bool isStudent = (bool)reader["isStudent"];
        int userId = (int)reader["id"];
        reader.Close();

        if (!isStudent)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync("User is not a student.");
            return;
        }

        command = new MySqlCommand(
            $"SELECT teacherId FROM students WHERE userId = {userId}",
            connection
        );
        reader = command.ExecuteReader();
        if (!reader.HasRows)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsJsonAsync("No teacher found for student.");
            return;
        }

        await reader.ReadAsync();
        int teacherId = (int)reader["teacherId"];
        reader.Close();

        command = new MySqlCommand(
            $"SELECT username, email FROM users WHERE id = {teacherId}",
            connection
        );
        reader = command.ExecuteReader();
        if (!reader.HasRows)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await context.Response.WriteAsJsonAsync("Teacher not found.");
            return;
        }

        await reader.ReadAsync();
        var teacher = new
        {
            Username = (string)reader["username"],
            Email = (string)reader["email"]
        };

        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(teacher);
    }

    public async Task<List<User>> GetTeacherInfoByStudentId(int studentId)
    {
        MySqlConnection connection = new MySqlConnection(ConnectionString.Value);
        MySqlCommand command = new MySqlCommand(
            "SELECT * FROM `users` WHERE isTeacher = 1",
            connection
        );

        await connection.OpenAsync();
        MySqlDataReader reader = command.ExecuteReader();
        List<User> teachers = new List<User>();
        while (reader.Read())
        {
            User teacher = new User
            {
                Id = (int)reader["id"],
                Username = (string)reader["username"],
                Email = (string)reader["email"],
                IsTeacher = (bool)reader["isTeacher"],
                IsStudent = (bool)reader["isStudent"],
                IsAdmin = (bool)reader["isAdmin"],
                CreatedAt = ((DateTime)reader["created_at"]).ToString("yy-MM-dd"),
                UpdatedAt = ((DateTime)reader["updated_at"]).ToString("yy-MM-dd"),
                LastActive = (DateTime)reader["lastActive"]
            };
            teachers.Add(teacher);
        }

        reader.Close();
        return teachers;
    }
}
