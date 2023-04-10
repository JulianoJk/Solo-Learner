using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using backend;

public static class JwtUtils
{
    private static readonly string SecretKey = JwtKey.Value;

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
            var key = Encoding.ASCII.GetBytes(SecretKey);
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

    public string GenerateJwtToken(string username)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, username) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);

        Console.WriteLine($"JWT token generated: {jwtToken}");

        return jwtToken;
    }

    private static bool IsValidUser(string username, string password)
    {
        // Implement your user authentication logic here
        // ...

        return true; // Return true if the user is valid
    }
}
