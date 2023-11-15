using System;
using backend;
using MySql.Data.MySqlClient;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

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
        string lastName,
        string gender,
        string email,
        string password,
        byte[]? salt,
        bool isTeacher,
        string? picture
    )
    {
        // Retrieve the isAdmin flag from the database
        bool isAdmin = db.GetIsAdminFromDatabase(email);

        // Initialize the database connection
        db.InitializeDatabaseConnection(
            isRegister,
            isGoogle,
            email,
            firstName,
            lastName,
            gender,
            username,
            password,
            salt,
            isTeacher,
            isAdmin,
            picture
        );

        if (!isRegister)
        {
            CheckPasswordForLogin(email, password);
            return CheckPasswordForLogin(email, password);
        }
        else
        {
            // Get the login status from the database
            return db.GetRegisterStatus();
        }
    }

    public byte[] GenerateHash(string password, byte[] salt)
    {
        byte[] hash = null;

        try
        {
            // Concatenate the password and salt
            byte[] passwordAndSalt = Encoding.UTF8.GetBytes(
                password + Convert.ToBase64String(salt)
            );

            // Generate a SHA256 hash of the password and salt
            using (var sha256 = SHA256.Create())
            {
                hash = sha256.ComputeHash(passwordAndSalt);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error generating hash: {ex.Message}");
        }

        return hash;
    }

    public (bool, string) CheckPasswordForLogin(string email, string password)
    {
        MySqlConnection connection = new MySqlConnection(connectionString);
        byte[]? salt = db.GetSaltFromDatabase(connection, email);
        bool found = false;

        if (salt == null)
        {
            MessageToUser = "Incorrect email or password.";
            return (found, MessageToUser);
        }

        // If the authentication is done through Google, skip password checking
        if (!string.IsNullOrWhiteSpace(password))
        {
            // Generate hash of the password using the retrieved salt
            byte[] hashedPassword = GenerateHash(password, salt);

            // Retrieve the stored hashed password for the user from the database
            string hashedPasswordString = db.GetHashedPasswordFromDatabase(connection, email);
            byte[] storedHashedPassword = Convert.FromBase64String(hashedPasswordString);

            // Compare the generated hash with the stored hashed password
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
            // Handle Google authentication logic here, if needed
            // You might want to set 'found' to true and customize the message
            found = true;
            MessageToUser = "Google Authentication Successful!";
        }

        return (found, MessageToUser);
    }

    public Tuple<bool, string> IsUsernameTaken(string username)
    {
        MySqlConnection connection = new MySqlConnection(connectionString);
        string uniqueUsername = username;
        int counter = 1;

        try
        {
            connection.Open();

            while (true) // we will break this loop from inside
            {
                MySqlCommand command = new MySqlCommand(
                    $"SELECT COUNT(*) FROM users WHERE username = @username",
                    connection
                );

                command.Parameters.AddWithValue("@username", uniqueUsername);
                int count = Convert.ToInt32(command.ExecuteScalar());

                if (count > 0) // if username is taken
                {
                    uniqueUsername = $"{username}{counter}"; // add counter to username
                    counter++; // increment counter for next possible iteration
                    return Tuple.Create(true, uniqueUsername); // return the new username
                }
                else
                {
                    break; // if username is not taken, break the loop
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            // Here, you might want to do error handling,
            // e.g., throw an exception or return a value indicating an error
        }
        finally
        {
            connection.Close();
        }

        if (counter == 1) // original username was not taken
            return Tuple.Create(false, "");

        return Tuple.Create(true, uniqueUsername); // username was taken, return the new one
    }

    public string? GetUserEmailFromGoogleId(string googleEmail)
    {
        using (var connection = new MySqlConnection(ConnectionString.Value))
        {
            connection.Open();

            using (
                var command = new MySqlCommand(
                    "SELECT email FROM users WHERE email = @GoogleEmail",
                    connection
                )
            )
            {
                command.Parameters.AddWithValue("@GoogleEmail", googleEmail);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return reader.GetString("email");
                    }
                }
            }
        }

        return null;
    }

    public UserInfo GetAdditionalUserInfoFromDb(string userEmail)
    {
        using (var connection = new MySqlConnection(ConnectionString.Value))
        {
            connection.Open();

            using (
                var command = new MySqlCommand(
                    "SELECT id, isTeacher, isAdmin FROM users WHERE email = @Email",
                    connection
                )
            )
            {
                command.Parameters.AddWithValue("@Email", userEmail);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new UserInfo
                        {
                            Id = reader.GetInt32("id"),
                            IsTeacher = reader.GetBoolean("isTeacher"),
                            IsAdmin = reader.GetBoolean("isAdmin")
                        };
                    }
                }
            }
        }

        return null;
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public bool IsTeacher { get; set; }
        public bool IsAdmin { get; set; }
    }
}
