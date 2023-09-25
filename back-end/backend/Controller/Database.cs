using MySql.Data.MySqlClient;
using backend;
using backend.Models;

namespace backend
{
    public class Database
    {
        private readonly string connectionString;

        // Getter and setter for areCredentialsCorrect
        public bool AreCredentialsCorrect { get; set; }

        // Getter and setter for messageToUser
        public string MessageToUser { get; set; }

        // Constructor to set the initial state of the properties and load the connection string from .env file
        public Database()
        {
            connectionString = ConnectionString.Value;
            AreCredentialsCorrect = false;
            MessageToUser = "";
        }

        // Method to initialize the database connection and perform registration or login based on 'isRegister' parameter
        public void InitializeDatabaseConnection(
            bool isRegister,
            string email,
            string firstName,
            string lastName,
            string gender,
            string? username,
            string password,
            byte[] salt,
            bool isTeacher,
            bool isAdmin
        )
        {
            MySqlConnection connection = new MySqlConnection(connectionString);
            try
            {
                connection.Open();
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Connection to MySQL server successful!");
                    if (isRegister)
                    {
                        try
                        {
                            if (CheckIfEmailExists(connection, email))
                            {
                                AreCredentialsCorrect = false;
                                MessageToUser = "Invalid email address or password.";
                            }
                            else
                            {
                                saveToDatabase(
                                    connection,
                                    email,
                                    firstName,
                                    lastName,
                                    gender,
                                    username,
                                    password,
                                    salt,
                                    isTeacher,
                                    isAdmin
                                );
                                AreCredentialsCorrect = true;
                                MessageToUser = "Registration successful!";
                            }
                        }
                        catch (MySqlException ex)
                        {
                            Console.WriteLine("Error: " + ex.Message);
                        }
                    }
                    else
                    {
                        // Call VerifyEmailAndPassword method to check email and password
                        CheckIfEmailExists(connection, email);
                    }
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
        }

        // Method to save user data to the database
        public void saveToDatabase(
            MySqlConnection connection,
            string email,
            string firstName,
            string lastName,
            string gender,
            string username,
            string password,
            byte[] salt,
            bool isTeacher,
            bool isAdmin
        )
        {
            MySqlCommand command = new MySqlCommand(
                "INSERT INTO users (email,firstName, lastName, gender, username, password, salt, isTeacher, isAdmin) VALUES (@email,@firstName, @lastName, @gender, @username, @password, @salt, @isTeacher, @isAdmin)",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@firstName", firstName);
            command.Parameters.AddWithValue("@lastName", lastName);
            command.Parameters.AddWithValue("@gender", gender);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);
            command.Parameters.AddWithValue("@salt", salt);
            command.Parameters.AddWithValue("@isTeacher", isTeacher);
            command.Parameters.AddWithValue("@isAdmin", isAdmin);
            MySqlDataReader reader = command.ExecuteReader();
            reader.Close();
            // Set AreCredentialsCorrect to true if the data was successfully saved to the database
            AreCredentialsCorrect = true;
        }

        // Method to check if an email exists in the database
        public bool CheckIfEmailExists(MySqlConnection connection, string email)
        {
            MySqlCommand command = new MySqlCommand(
                $"SELECT COUNT(*) FROM users WHERE email = '{email}'",
                connection
            );
            int count = Convert.ToInt32(command.ExecuteScalar());
            return count > 0;
        }

        // Method to return both AreCredentialsCorrect and MessageToUser
        public (bool, string) GetRegisterStatus()
        {
            return (AreCredentialsCorrect, MessageToUser);
        }

        // Method to retrieve a user's salt value from the database
        public byte[] GetSaltFromDatabase(MySqlConnection connection, string email)
        {
            connection.Open();
            MySqlCommand command = new MySqlCommand(
                $"SELECT salt FROM users WHERE email = '{email}'",
                connection
            );
            object salt = command.ExecuteScalar();
            if (salt == null || salt == DBNull.Value)
            {
                return null;
            }
            else
            {
                connection.Close();
                return (byte[])salt;
            }
        }

        // Method to retrieve a user's hashedPassword value from the database
        public string GetHashedPasswordFromDatabase(MySqlConnection connection, string email)
        {
            connection.Open();
            MySqlCommand command = new MySqlCommand(
                $"SELECT password FROM users WHERE email = '{email}'",
                connection
            );
            object password = command.ExecuteScalar();
            if (password == null || password == DBNull.Value)
            {
                return null;
            }
            else
            {
                connection.Close();
                return (string)password;
            }
        }

        public async Task<bool> DeleteUserByIdAsync(int? id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid user ID");
            }

            MySqlConnection connection = new(connectionString);

            try
            {
                await connection.OpenAsync();

                MySqlCommand command = new("DELETE FROM users WHERE id=@id", connection);
                command.Parameters.AddWithValue("@id", id);

                int rowsAffected = await command.ExecuteNonQueryAsync();

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        public async Task<bool> AdminDeleteUserByIdAsync(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Invalid user ID");
            }

            using MySqlConnection connection = new MySqlConnection(connectionString);

            try
            {
                await connection.OpenAsync();

                MySqlCommand command = new MySqlCommand(
                    "DELETE FROM users WHERE id=@userId",
                    connection
                );
                command.Parameters.AddWithValue("@userId", userId);

                int rowsAffected = await command.ExecuteNonQueryAsync();

                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        public bool GetIsAdminFromDatabase(string email)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var command = new MySqlCommand(
                    "SELECT isAdmin FROM users WHERE email = @email",
                    connection
                );
                command.Parameters.AddWithValue("@email", email);
                var isAdmin = command.ExecuteScalar();
                return isAdmin != null && Convert.ToBoolean(isAdmin);
            }
        }
    }
}