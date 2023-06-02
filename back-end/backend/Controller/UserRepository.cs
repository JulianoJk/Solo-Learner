using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Models;
using MySql.Data.MySqlClient;

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
            MySqlConnection connection = new MySqlConnection(connectionString);
            try
            {
                await connection.OpenAsync();
                MySqlCommand command = new MySqlCommand(
                    $"UPDATE users SET lastActive = CONVERT_TZ(NOW(), @@session.time_zone, '+03:00') WHERE email = @email",
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

        public async Task GetLastActive(HttpContext context)
        {
            string email = JwtUtils.GetUserEmailFromJwt(context);
            // Read the request body

            await UpdateLastActive(email);

            var response = new { status = "success" };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
