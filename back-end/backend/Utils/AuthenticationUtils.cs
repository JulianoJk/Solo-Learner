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
        string? username,
        string email,
        string password,
        byte[]? salt,
        bool isTeacher,
        bool isStudent
    )
    {
        // Retrieve the isAdmin flag from the database
        bool isAdmin = db.GetIsAdminFromDatabase(email);

        // Initialize the database connection
        db.InitializeDatabaseConnection(
            isRegister,
            email,
            username,
            password,
            salt,
            isTeacher,
            isStudent,
            isAdmin
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
        byte[] salt = db.GetSaltFromDatabase(connection, email);
        bool found = false;

        if (salt == null)
        {
            MessageToUser = "Incorrect email or password.";

            return (found, MessageToUser);
        }
        else
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
                MessageToUser = "Login Succesfull!";

                return (found, MessageToUser);
            }
            else
            {
                MessageToUser = "Incorrect email or password.";

                return (false, MessageToUser);
            }
        }
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
}
