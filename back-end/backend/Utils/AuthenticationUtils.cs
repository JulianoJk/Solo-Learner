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
        bool isTeacher
    )
    {
        // Initialize the database connection
        db.InitializeDatabaseConnection(isRegister, email, username, password, salt, isTeacher);
        if (isRegister == false)
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
}
