using Npgsql;
using backend;
using backend.Models;

namespace backend
{
    public class Database
    {
        private readonly string connectionString;

        public bool AreCredentialsCorrect { get; set; }
        public string MessageToUser { get; set; }

        public Database()
        {
            connectionString = ConnectionString.Value;
            AreCredentialsCorrect = false;
            MessageToUser = "";
        }

        public void InitializeDatabaseConnection(
            bool isRegister,
            bool isGoogle,
            string email,
            string firstName,
            string lastName,
            string gender,
            string? username,
            string? password,
            byte[]? salt,
            bool isTeacher,
            bool isAdmin,
            string? picture
        )
        {
            using var connection = new NpgsqlConnection(connectionString);
            try
            {
                connection.Open();
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Connection to PostgreSQL server successful!");
                    if (isRegister)
                    {
                        try
                        {
                            if (CheckIfEmailExists(connection, email))
                            {
                                AreCredentialsCorrect = false;
                                MessageToUser = "Invalid email address or password.";
                            }
                            else if (!isGoogle)
                            {
                                saveToDatabase(
                                    connection,
                                    email,
                                    firstName,
                                    lastName,
                                    gender,
                                    username ?? "",
                                    password ?? "",
                                    salt,
                                    isTeacher,
                                    isAdmin,
                                    null
                                );
                                AreCredentialsCorrect = true;
                                MessageToUser = "Registration successful!";
                            }
                            else
                            {
                                saveToDatabase(
                                    connection,
                                    email,
                                    firstName,
                                    lastName,
                                    gender,
                                    username ?? "",
                                    "",
                                    null,
                                    isTeacher,
                                    isAdmin,
                                    picture
                                );
                                AreCredentialsCorrect = true;
                                MessageToUser = "Registration successful!";
                            }
                        }
                        catch (PostgresException ex)
                        {
                            Console.WriteLine("Error: " + ex.Message);
                        }
                    }
                    else
                    {
                        CheckIfEmailExists(connection, email);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

        public void saveToDatabase(
            NpgsqlConnection connection,
            string email,
            string firstName,
            string lastName,
            string gender,
            string username,
            string password,
            byte[]? salt,
            bool isTeacher,
            bool isAdmin,
            string? picture
        )
        {
            using var command = new NpgsqlCommand(
                "INSERT INTO users (email, \"firstName\", \"lastName\", gender, username, password, salt, \"isTeacher\", \"isAdmin\", picture) VALUES (@email, @firstName, @lastName, @gender, @username, @password, @salt, @isTeacher, @isAdmin, @picture)",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@firstName", firstName);
            command.Parameters.AddWithValue("@lastName", lastName);
            command.Parameters.AddWithValue("@gender", gender);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);
            command.Parameters.AddWithValue("@salt", (object?)salt ?? DBNull.Value);
            command.Parameters.AddWithValue("@isTeacher", isTeacher);
            command.Parameters.AddWithValue("@isAdmin", isAdmin);
            command.Parameters.AddWithValue("@picture", (object?)picture ?? DBNull.Value);
            command.ExecuteNonQuery();
            AreCredentialsCorrect = true;
        }

        public bool CheckIfEmailExists(NpgsqlConnection connection, string email)
        {
            using var command = new NpgsqlCommand(
                "SELECT COUNT(*) FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            var count = Convert.ToInt32(command.ExecuteScalar());
            return count > 0;
        }

        public (bool, string) GetRegisterStatus()
        {
            return (AreCredentialsCorrect, MessageToUser);
        }

        public byte[]? GetSaltFromDatabase(NpgsqlConnection connection, string email)
        {
            if (connection.State != System.Data.ConnectionState.Open)
                connection.Open();
            using var command = new NpgsqlCommand(
                "SELECT salt FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            var salt = command.ExecuteScalar();
            if (salt == null || salt == DBNull.Value)
                return null;
            return (byte[])salt;
        }

        public string? GetHashedPasswordFromDatabase(NpgsqlConnection connection, string email)
        {
            if (connection.State != System.Data.ConnectionState.Open)
                connection.Open();
            using var command = new NpgsqlCommand(
                "SELECT password FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            var password = command.ExecuteScalar();
            if (password == null || password == DBNull.Value)
                return null;
            return (string)password;
        }

        public async Task<bool> DeleteUserByIdAsync(int? id)
        {
            if (id == null || id <= 0)
                throw new ArgumentException("Invalid user ID");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();
            using var command = new NpgsqlCommand("DELETE FROM users WHERE id = @id", connection);
            command.Parameters.AddWithValue("@id", id.Value);
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> AdminDeleteUserByIdAsync(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user ID");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();
            using var command = new NpgsqlCommand("DELETE FROM users WHERE id = @userId", connection);
            command.Parameters.AddWithValue("@userId", userId);
            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public bool GetIsAdminFromDatabase(string email)
        {
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();
            using var command = new NpgsqlCommand(
                "SELECT \"isAdmin\" FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            var isAdmin = command.ExecuteScalar();
            return isAdmin != null && Convert.ToBoolean(isAdmin);
        }
    }
}
