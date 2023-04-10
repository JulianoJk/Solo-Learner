using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend;

public static class JwtUtils
{
    public static bool ValidateJwt(HttpContext context)
    {
        // Get the authorization header from the request
        string authHeader = context.Request.Headers["Authorization"];

        // Check if the header is present and contains a valid JWT
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            string jwt = authHeader.Substring("Bearer ".Length);
            return ValidateJwt(jwt);
        }
        return false;
    }

    public static bool ValidateJwt(string jwt)
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

    public static string GenerateJwt(string username)
    {
        // Implement your user authentication logic here
        // ...
        return GenerateJwtToken(username);
    }

    private static string GenerateJwtToken(string username, string email, bool isTeacher)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Name, email),
                    new Claim(ClaimTypes.Name, isTeacher),
                }
            ),
            Expires = DateTime.UtcNow.AddSeconds(20),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        return jwtToken;
    }
}
