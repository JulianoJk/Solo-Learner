using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend;
using MySql.Data.MySqlClient;

public static class JwtUtils
{
    public static bool authenticateJwt(HttpContext context)
    {
        // Get the authorization header from the request
        string authHeader = context.Request.Headers["Authorization"];

        // Check if the header is present and contains a valid JWT
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            string jwt = authHeader.Substring("Bearer ".Length);
            if (ValidateJwt(jwt) && !IsJwtExpired(jwt))
            {
                return true;
            }
        }
        return false;
    }

    public static bool IsJwtExpired(string jwt)
    {
        // Decode the JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(jwt);

        // Check if the "exp" claim is present and has a valid value
        return token.ValidTo == null || token.ValidTo < DateTime.UtcNow;
    }

    private static bool ValidateJwt(string jwt)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JwtKey.Value);
            tokenHandler.ValidateToken(
                jwt,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                },
                out SecurityToken validatedToken
            );
        }
        catch
        {
            return false;
        }
        return true;
    }

    public static string GenerateJwt(string username, string email, bool isTeacher)
    {
        // Implement your user authentication logic here
        // ...
        return GenerateSecurityToken(username, email, isTeacher);
    }

    private static string GenerateSecurityToken(string username, string email, bool isTeacher)
    {
        var id = GetUserIdFromDB(email);
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(JwtKey.Value);
        var expires = DateTime.UtcNow.AddMinutes(
            int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRES_IN_MINUTES") ?? "20")
        );
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Email, email),
                    new Claim("isTeacher", isTeacher.ToString()),
                    new Claim("id", id.ToString())
                }
            ),
            Expires = expires,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        return jwtToken;
    }

    public static string? GetUserEmailFromJwt(HttpContext context)
    {
        if (authenticateJwt(context))
        {
            string authHeader = context.Request.Headers["Authorization"];
            string jwt = authHeader.Substring("Bearer ".Length);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var token = tokenHandler.ReadJwtToken(jwt);
                var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "email");
                if (userIdClaim != null)
                {
                    return userIdClaim.Value;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating hash: {ex.Message}");
            }
        }
        return null;
    }

    private static int? GetUserIdFromDB(string email)
    {
        int? id = null;
        using (var connection = new MySqlConnection(ConnectionString.Value))
        {
            connection.Open();
            using (
                var command = new MySqlCommand(
                    "SELECT id FROM users WHERE email=@Email",
                    connection
                )
            )
            {
                command.Parameters.AddWithValue("@Email", email);
                var result = command.ExecuteScalar();
                if (result != null)
                {
                    id = Convert.ToInt32(result);
                }
            }
        }
        return id;
    }
}
