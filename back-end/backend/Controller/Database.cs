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
            string password
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
                                //TODO!: CHANGE THIS PRINT TO RETURN IT TO USER
                                MessageToUser = "Email already exists.";
                            }
                            else
                            {
                                //TODO!: CHANGE THIS PRINT TO RETURN IT TO USER
                                saveToDatabase(connection, email, username, password);
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
                        VerifyEmailAndPassword(connection, email, password);
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
            string password
        )
        {
            MySqlCommand command = new MySqlCommand(
                $"INSERT INTO USERS(EMAIL, USERNAME,PASSWORD) VALUES('{email}', '{username}', '{password}')",
                connection
            );
            MySqlDataReader reader = command.ExecuteReader();
            reader.Close();
        }

        // Method to verify if the email exists and password is correct
        public void VerifyEmailAndPassword(
            MySqlConnection connection,
            string email,
            string password
        )
        {
            MySqlCommand command = new MySqlCommand(
                $"SELECT * FROM users WHERE email = '{email}';",
                connection
            );
            if (CheckIfEmailExists(connection, email))
            {
                MySqlDataReader reader = command.ExecuteReader();
                bool found = false;
                while (reader.Read())
                {
                    string dbPassword = reader["password"].ToString();
                    if (password == dbPassword)
                    {
                        found = true;
                        MessageToUser = "Login successful!";
                    }
                    else
                    {
                        MessageToUser = "Incorrect email or password";
                    }
                }

                reader.Close();
                AreCredentialsCorrect = found;
            }
            else
            {
                MessageToUser = "Incorrect email or password";
            }
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
        public (bool, string) GetLoginStatus()
        {
            return (AreCredentialsCorrect, MessageToUser);
        }
    }
}
