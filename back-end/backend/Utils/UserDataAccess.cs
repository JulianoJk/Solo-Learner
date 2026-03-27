using System;
using System.Collections.Generic;
using Npgsql;
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

        NpgsqlConnection connection = new NpgsqlConnection(connectionString);

        try
        {
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
            {
                NpgsqlCommand command = new NpgsqlCommand(
                    "SELECT username, \"isTeacher\" FROM users",
                    connection
                );
                NpgsqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string username = (string)reader["username"];
                    bool isTeacher = (bool)reader["isTeacher"];
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

        NpgsqlConnection connection = new NpgsqlConnection(connectionString);

        try
        {
            connection.Open();
            if (connection.State == System.Data.ConnectionState.Open)
            {
                NpgsqlCommand command = new NpgsqlCommand(
                    "SELECT username FROM users WHERE email = @Email",
                    connection
                );

                command.Parameters.AddWithValue("@Email", email);

                NpgsqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    username = (string)reader["username"];
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