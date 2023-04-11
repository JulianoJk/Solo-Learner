using backend;
using MySql.Data.MySqlClient;

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

            User user = new User
            {
                Id = (int)reader["id"],
                Username = (string)reader["username"],
                IsTeacher = isTeacher,
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
            username = user.Username,
            isTeacher = user.IsTeacher,
            createdAt = user.CreatedAt
        };

        // Set the response status code and return the response object as JSON
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.WriteAsJsonAsync(response);
    }
}
