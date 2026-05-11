using System;
using backend;
using MySql.Data.MySqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

public class AuthenticationUtils
{
    private readonly Database db;
    private readonly string connectionString;
    public string MessageToUser { get; set; }

    public AuthenticationUtils()
    {
        connectionString = ConnectionString.Value;
        db = new Database();
        MessageToUser = "";
    }

    public (bool, string) AuthenticateUser(
        bool isRegister,
        bool isGoogle,
        string? username,
        string firstName,
        string middleName,
        string lastName,
        string gender,
        string email,
        string password,
        byte[]? salt,
        bool isTeacher,
        bool isStudent,
        bool isAdmin,
        string? picture,
        string? phoneNumber,
        string? countryName,
        string? countryFlag,
        bool mustChangePassword
    )
    {
        db.InitializeDatabaseConnection(
            isRegister,
            isGoogle,
            email,
            firstName,
            middleName,
            lastName,
            gender,
            username ?? "",
            password ?? "",
            salt,
            isTeacher,
            isStudent,
            isAdmin,
            picture,
            phoneNumber,
            countryName,
            countryFlag,
            mustChangePassword
        );

        if (!isRegister)
        {
            return CheckPasswordForLogin(email, password ?? "");
        }

        return db.GetRegisterStatus();
    }

    public byte[] GenerateHash(string password, byte[] salt)
    {
        try
        {
            byte[] passwordAndSalt = Encoding.UTF8.GetBytes(password + Convert.ToBase64String(salt));
            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(passwordAndSalt);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating hash: {ex.Message}");
            return Array.Empty<byte>();
        }
    }

    public (bool, string) CheckPasswordForLogin(string email, string password)
    {
        using var connection = new MySqlConnection(connectionString);
        byte[]? salt = db.GetSaltFromDatabase(connection, email);
        bool found = false;

        if (salt == null)
        {
            MessageToUser = "Incorrect email or password.";
            return (found, MessageToUser);
        }

        if (!string.IsNullOrWhiteSpace(password))
        {
            byte[] hashedPassword = GenerateHash(password, salt);
            string hashedPasswordString = db.GetHashedPasswordFromDatabase(connection, email);
            byte[] storedHashedPassword = Convert.FromBase64String(hashedPasswordString);

            if (storedHashedPassword.SequenceEqual(hashedPassword))
            {
                found = true;
                MessageToUser = "Login Successful!";
            }
            else
            {
                MessageToUser = "Incorrect email or password.";
            }
        }
        else
        {
            found = true;
            MessageToUser = "Google Authentication Successful!";
        }

        return (found, MessageToUser);
    }

    public Tuple<bool, string> IsUsernameTaken(string username)
    {
        using var connection = new MySqlConnection(connectionString);
        string uniqueUsername = username;
        int counter = 1;

        try
        {
            connection.Open();
            while (true)
            {
                using var command = new MySqlCommand("SELECT COUNT(*) FROM users WHERE username = @username", connection);
                command.Parameters.AddWithValue("@username", uniqueUsername);
                int count = Convert.ToInt32(command.ExecuteScalar());

                if (count > 0)
                {
                    uniqueUsername = $"{username}{counter}";
                    counter++;
                    return Tuple.Create(true, uniqueUsername);
                }
                else
                {
                    break;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }

        return counter == 1 ? Tuple.Create(false, "") : Tuple.Create(true, uniqueUsername);
    }

    public string? GetUserEmailFromGoogleId(string googleEmail)
    {
        using var connection = new MySqlConnection(ConnectionString.Value);
        connection.Open();

        using var command = new MySqlCommand("SELECT email FROM users WHERE email = @GoogleEmail", connection);
        command.Parameters.AddWithValue("@GoogleEmail", googleEmail);

        using var reader = command.ExecuteReader();
        return reader.Read() ? reader.GetString("email") : null;
    }

    public UserInfo? GetAdditionalUserInfoFromDb(string userEmail)
    {
        using var connection = new MySqlConnection(ConnectionString.Value);
        connection.Open();

        using var command = new MySqlCommand(
            "SELECT id, isTeacher, isStudent, isAdmin, picture FROM users WHERE email = @Email",
            connection
        );
        command.Parameters.AddWithValue("@Email", userEmail);

        using var reader = command.ExecuteReader();
        if (reader.Read())
        {
            return new UserInfo
            {
                Id = reader.GetInt32("id"),
                IsTeacher = reader.GetBoolean("isTeacher"),
                isStudent = reader.GetBoolean("isStudent"),
                IsAdmin = reader.GetBoolean("isAdmin"),
                Picture = reader.GetString("picture")
            };
        }

        return null;
    }

    public string? GetAuthMethod(string email)
    {
        using var connection = new MySqlConnection(ConnectionString.Value);
        connection.Open();

        using var command = new MySqlCommand("SELECT authMethod FROM users WHERE email = @Email", connection);
        command.Parameters.AddWithValue("@Email", email);

        using var reader = command.ExecuteReader();
        return reader.Read() ? reader.GetString("authMethod") : null;
    }
    public int GetUserIdByEmail(string email)
    {
        using var connection = Database.Connect(); // assuming you have a static method like this
        var command = connection.CreateCommand();
        command.CommandText = "SELECT id FROM users WHERE email = @email LIMIT 1";
        command.Parameters.AddWithValue("@email", email);

        var result = command.ExecuteScalar();
        return result != null ? Convert.ToInt32(result) : -1;
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public bool IsTeacher { get; set; }
        public bool isStudent { get; set; }
        public bool IsAdmin { get; set; }
        public string Picture { get; set; } = string.Empty;
    }
}
