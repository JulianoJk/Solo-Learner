using MySql.Data.MySqlClient;
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
            string middleName,
            string lastName,
            string gender,
            string? username,
            string? password,
            byte[]? salt,
            bool isTeacher,
            bool isStudent,
            bool isAdmin,
            string? picture,
            string? phoneNumber,
            string? countryName,
            string? countryFlag,
            bool mustChangePassword
        )
        {
            using MySqlConnection connection = new MySqlConnection(connectionString);

            try
            {
                connection.Open();
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Connection to MySQL server successful!");
                    if (isRegister)
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
                                middleName,
                                lastName,
                                gender,
                                username,
                                isGoogle ? "" : password,
                                isGoogle ? null : salt,
                                isTeacher,
                                isStudent,
                                isAdmin,
                                picture,
                                phoneNumber,
                                countryName,
                                countryFlag,
                                mustChangePassword 
                            );
                            AreCredentialsCorrect = true;
                            MessageToUser = "Registration successful!";
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
            MySqlConnection connection,
            string email,
            string firstName,
            string middleName,
            string lastName,
            string gender,
            string username,
            string password,
            byte[]? salt,
            bool isTeacher,
            bool isStudent,
            bool isAdmin,
            string? picture,
            string? phoneNumber,
            string? countryName,
            string? countryFlag,
            bool mustChangePassword 
        )
        {
            MySqlCommand command = new MySqlCommand(
                @"INSERT INTO users (
                    email, firstName, middleName, lastName, gender, username, password, salt,
                    isTeacher, isStudent, isAdmin, picture, phoneNumber, countryName, countryFlag, mustChangePassword
                ) VALUES (
                    @Email, @FirstName, @MiddleName, @LastName, @Gender, @Username, @Password, @Salt,
                    @IsTeacher, @IsStudent, @IsAdmin, @Picture, @PhoneNumber, @CountryName, @CountryFlag, @MustChangePassword
                )",
                connection
            );

            command.Parameters.AddWithValue("@Email", email);
            command.Parameters.AddWithValue("@FirstName", firstName);
            command.Parameters.AddWithValue("@MiddleName", middleName);
            command.Parameters.AddWithValue("@LastName", lastName);
            command.Parameters.AddWithValue("@Gender", gender);
            command.Parameters.AddWithValue("@Username", username);
            command.Parameters.AddWithValue("@Password", password);
            command.Parameters.AddWithValue("@Salt", salt);
            command.Parameters.AddWithValue("@IsTeacher", isTeacher);
            command.Parameters.AddWithValue("@IsStudent", isStudent);
            command.Parameters.AddWithValue("@IsAdmin", isAdmin);
            command.Parameters.AddWithValue("@Picture", picture);
            command.Parameters.AddWithValue("@PhoneNumber", phoneNumber);
            command.Parameters.AddWithValue("@CountryName", countryName);
            command.Parameters.AddWithValue("@CountryFlag", countryFlag);
            command.Parameters.AddWithValue("@MustChangePassword", mustChangePassword); 
            command.ExecuteNonQuery();
        }

        public bool CheckIfEmailExists(MySqlConnection connection, string email)
        {
            MySqlCommand command = new MySqlCommand(
                "SELECT COUNT(*) FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            int count = Convert.ToInt32(command.ExecuteScalar());
            return count > 0;
        }

        public (bool, string) GetRegisterStatus()
        {
            return (AreCredentialsCorrect, MessageToUser);
        }

        public byte[] GetSaltFromDatabase(MySqlConnection connection, string email)
        {
            connection.Open();
            MySqlCommand command = new MySqlCommand(
                "SELECT salt FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            object salt = command.ExecuteScalar();
            connection.Close();
            return salt == null || salt == DBNull.Value ? null : (byte[])salt;
        }

        public string GetHashedPasswordFromDatabase(MySqlConnection connection, string email)
        {
            connection.Open();
            MySqlCommand command = new MySqlCommand(
                "SELECT password FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);
            object password = command.ExecuteScalar();
            connection.Close();
            return password == null || password == DBNull.Value ? null : (string)password;
        }

        public async Task<bool> DeleteUserByIdAsync(int? id)
        {
            if (id <= 0) throw new ArgumentException("Invalid user ID");

            using MySqlConnection connection = new(connectionString);
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
        }

        public async Task AssignStudentsToTeacher(int teacherId, List<int> studentIds)
        {
            using var connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();
            foreach (var studentId in studentIds)
            {
                var cmd = new MySqlCommand(
                    "INSERT IGNORE INTO teacher_student_assignments (teacherId, studentId) VALUES (@teacherId, @studentId)",
                    connection
                );
                cmd.Parameters.AddWithValue("@teacherId", teacherId);
                cmd.Parameters.AddWithValue("@studentId", studentId);
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task AssignTeachersToStudent(int studentId, List<int> teacherIds)
        {
            using var connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();
            foreach (var teacherId in teacherIds)
            {
                var cmd = new MySqlCommand(
                    "INSERT IGNORE INTO teacher_student_assignments (teacherId, studentId) VALUES (@teacherId, @studentId)",
                    connection
                );
                cmd.Parameters.AddWithValue("@teacherId", teacherId);
                cmd.Parameters.AddWithValue("@studentId", studentId);
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public int GetUserIdByEmail(string email)
        {
            using var connection = new MySqlConnection(connectionString);
            connection.Open();
            var command = new MySqlCommand("SELECT id FROM users WHERE email = @Email", connection);
            command.Parameters.AddWithValue("@Email", email);
            object result = command.ExecuteScalar();
            return result != null ? Convert.ToInt32(result) : -1;
        }

        public async Task<bool> AdminDeleteUserByIdAsync(int userId)
        {
            if (userId <= 0) throw new ArgumentException("Invalid user ID");

            using MySqlConnection connection = new(connectionString);
            try
            {
                await connection.OpenAsync();
                MySqlCommand command = new("DELETE FROM users WHERE id=@userId", connection);
                command.Parameters.AddWithValue("@userId", userId);
                int rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }
        }

        public bool GetIsAdminFromDatabase(string email)
        {
            using var connection = new MySqlConnection(connectionString);
            connection.Open();
            var command = new MySqlCommand("SELECT isAdmin FROM users WHERE email = @email", connection);
            command.Parameters.AddWithValue("@email", email);
            var isAdmin = command.ExecuteScalar();
            return isAdmin != null && Convert.ToBoolean(isAdmin);
        }

        public static MySqlConnection Connect()
        {
            var connection = new MySqlConnection(ConnectionString.Value);
            connection.Open();
            return connection;
        }
    }
}
