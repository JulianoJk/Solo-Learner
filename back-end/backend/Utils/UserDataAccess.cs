using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using backend;

public class UserDataAccess
{
    private readonly string connectionString;

    public UserDataAccess()
    {
        connectionString = ConnectionString.Value;
    }

    public List<(string, bool)> GetAllUsers()
    {
        List<(string, bool)> users = new List<(string, bool)>();

        MySqlConnection connection = new MySqlConnection(connectionString);

        try
        {
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
            {
                MySqlCommand command = new MySqlCommand(
                    "SELECT username, isTeacher FROM users",
                    connection
                );
                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string username = reader.GetString("username");
                    bool isTeacher = reader.GetBoolean("isTeacher");
                    users.Add((username, isTeacher));
                }

                reader.Close();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        finally
        {
            connection.Close();
        }

        return users;
    }

    public string GetUsername(string email)
    {
        return GetUsernameBasedOnEmail(email);
    }

    private string GetUsernameBasedOnEmail(string email)
    {
        string username = null;

        MySqlConnection connection = new MySqlConnection(connectionString);

        try
        {
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
            {
                MySqlCommand command = new MySqlCommand(
                    "SELECT username FROM users WHERE email = @Email",
                    connection
                );

                command.Parameters.AddWithValue("@Email", email);

                MySqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    username = reader.GetString("username");
                }

                reader.Close();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        finally
        {
            connection.Close();
        }

        return username;
    }
}