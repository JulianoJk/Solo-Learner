using System;
using backend;
using MySql.Data.MySqlClient;
using dotenv.net;

public class AuthenticationUtils
{
    private readonly Database db;
    private readonly MySqlConnection connection;

    public AuthenticationUtils()
    {
        DotEnv.Load();

        // Read the value of the CONNECTION_STRING environment variable
        string connectionStringFromEnv = Environment.GetEnvironmentVariable("CONNECTION_STRING");

        db = new Database();
        connection = new MySqlConnection(connectionStringFromEnv);
    }

    public (bool, string) AuthenticateUser(bool isRegister, string? username, string email,
        string password)
    {
        // Initialize the database connection
        db.InitializeDatabaseConnection(isRegister, email, username, password);

        // Get the login status from the database
        return db.GetLoginStatus();
    }
}