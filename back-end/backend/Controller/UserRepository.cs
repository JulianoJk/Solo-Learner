using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Models;
using Npgsql;

namespace backend
{
    public class UserRepository
    {
        private readonly string connectionString;

        public UserRepository()
        {
            connectionString = ConnectionString.Value;
        }

        private async Task UpdateLastActive(string email)
        {
            NpgsqlConnection connection = new NpgsqlConnection(connectionString);
            try
            {
                await connection.OpenAsync();
                NpgsqlCommand command = new NpgsqlCommand(
                    "UPDATE users SET \"lastActive\" = NOW() WHERE email = @email",
                    connection
                );
                command.Parameters.AddWithValue("@email", email);
                await command.ExecuteNonQueryAsync();
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

        public async Task UpdateUserIsLoggedIn(bool isUserLoggedIn, string email)
        {
            NpgsqlConnection connection = new NpgsqlConnection(connectionString);
            try
            {
                await connection.OpenAsync();
                NpgsqlCommand command = new NpgsqlCommand(
                    "UPDATE users SET \"isUserLoggedIn\" = @isUserLoggedIn WHERE email = @email",
                    connection
                );
                command.Parameters.AddWithValue("@isUserLoggedIn", isUserLoggedIn);
                command.Parameters.AddWithValue("@email", email);
                await command.ExecuteNonQueryAsync();
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

        public async Task GetLastActive(HttpContext context)
        {
            string email = JwtUtils.GetUserEmailFromJwt(context);
            // Read the request body

            await UpdateLastActive(email);

            var response = new { status = "success" };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }

        public async Task GetCurrentUser(HttpContext context)
        {
            string email = JwtUtils.GetUserEmailFromJwt(context);

            var response = new
            {
                status = "success",
                data = await GetCurrentUserFromDatabase(email)
            };

            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }

        protected async Task<CurrentUser?> GetCurrentUserFromDatabase(string email)
        {
            NpgsqlConnection connection = new NpgsqlConnection(ConnectionString.Value);
            NpgsqlCommand command = new NpgsqlCommand(
                "SELECT id, email, username, \"isAdmin\", \"isTeacher\", created_at, updated_at, \"lastActive\" FROM users WHERE email = @email",
                connection
            );
            command.Parameters.AddWithValue("@email", email);

            await connection.OpenAsync();
            using var reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                reader.Read();
                bool isTeacher = (bool)reader["isTeacher"];
                bool IsAdmin = (bool)reader["isAdmin"];

                CurrentUser currentUser = new CurrentUser
                {
                    Id = (int)reader["id"],
                    Email = (string)reader["email"],
                    Username = (string)reader["username"],
                    IsTeacher = isTeacher,
                    IsAdmin = IsAdmin,
                    CreatedAt = ((DateTime)reader["created_at"]).ToString("yy-MM-dd")
                };
                reader.Close();
                return currentUser;
            }

            reader.Close();
            return null;
        }
    }
}
