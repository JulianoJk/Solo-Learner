using System;
using backend;
using MySql.Data.MySqlClient;

public class AuthenticationUtils
{
    private readonly Database db;
    private readonly MySqlConnection connection;

    public AuthenticationUtils()
    {
        db = new Database();
    }

    public (bool, string) AuthenticateUser(
        bool isRegister,
        string? username,
        string email,
        string password
    )
    {
        // Initialize the database connection
        db.InitializeDatabaseConnection(isRegister, email, username, password);

        // Get the login status from the database
        return db.GetLoginStatus();
    }
}
