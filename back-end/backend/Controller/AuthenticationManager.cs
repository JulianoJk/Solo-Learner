using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend;

public class AuthenticationManager
{
    public async Task Logout(HttpContext context)
    {
        try
        {
            var userEmail = JwtUtils.GetUserEmailFromJwt(context);

            // Get the authorization header from the request
            string authHeader = context.Request.Headers["Authorization"];
            UserRepository userRepository = new UserRepository();
            // Check if the header is present and contains a valid JWT
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                string jwt = authHeader.Substring("Bearer ".Length);

                // Extract lastVisitedPath from the request body
                var requestBody = await new System.IO.StreamReader(
                    context.Request.Body
                ).ReadToEndAsync();
                var lastVisitedPath = await ExtractLastVisitedPath(requestBody);

                // Update user status in the database (isUserLoggedIn = false)
                await userRepository.UpdateUserIsLoggedIn(false, userEmail);

                // Update lastVisitedPath in the database
                await UpdateLastVisitedPathInDb(context, lastVisitedPath);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during logout: {ex.Message}");
        }
    }

    private async Task UpdateLastVisitedPathInDb(HttpContext context, string lastVisitedPath)
    {
        try
        {
            // Extract user information from the JWT
            var userEmail = JwtUtils.GetUserEmailFromJwt(context);
            var userId = JwtUtils.GetUserId(userEmail);

            // Update lastVisitedPath in the database
            using (var connection = new MySqlConnection(ConnectionString.Value))
            {
                await connection.OpenAsync();
                using (
                    var command = new MySqlCommand(
                        "UPDATE users SET lastVisitedPath = @LastVisitedPath WHERE id = @UserId",
                        connection
                    )
                )
                {
                    command.Parameters.AddWithValue("@LastVisitedPath", lastVisitedPath);
                    command.Parameters.AddWithValue("@UserId", userId);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating lastVisitedPath in the database: {ex.Message}");
        }
    }

    private async Task<string> ExtractLastVisitedPath(string requestBody)
    {
        try
        {
            // Assuming the request body is a JSON object
            var requestBodyObject = JsonConvert.DeserializeObject<Dictionary<string, string>>(
                requestBody
            );
            if (requestBodyObject.ContainsKey("lastVisitedPath"))
            {
                return requestBodyObject["lastVisitedPath"];
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"Error extracting lastVisitedPath from the request body: {ex.Message}"
            );
        }

        return null;
    }
}
