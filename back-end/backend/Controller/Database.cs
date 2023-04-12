using MySql.Data.MySqlClient;
using backend;

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
            string? username,
            string password,
            byte[] salt,
            bool isTeacher
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
                                MessageToUser = "Email already exists.";
                            }
                            else
                            {
                                saveToDatabase(
                                    connection,
                                    email,
                                    username,
                                    password,
                                    salt,
                                    isTeacher
                                );
                                AreCredentialsCorrect = true;
                                MessageToUser = "Registration From database!";
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
            string username,
            string password,
            byte[] salt,
            bool isTeacher
        )
        {
            MySqlCommand command = new MySqlCommand(
                "INSERT INTO users (email, username, password, salt, isTeacher) VALUES (@email, @username, @password, @salt, @isTeacher)",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);
            command.Parameters.AddWithValue("@salt", salt);
            command.Parameters.AddWithValue("@isTeacher", isTeacher);
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
    }
}
