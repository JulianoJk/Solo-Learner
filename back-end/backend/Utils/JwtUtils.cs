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
        var jwtToken = tokenHandler.ReadJwtToken(jwt);

        // Check if the "exp" claim is present and has a valid value
        if (jwtToken.ValidTo != null && jwtToken.ValidTo >= DateTime.UtcNow)
        {
            return false;
        }
        return true;
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

    public static string GenerateJwt(string username, string email)
    {
        // Implement your user authentication logic here
        // ...
        return GenerateSecurityToken(username, email);
    }

    private static string GenerateSecurityToken(string username, string email)
    {
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
                    new Claim(ClaimTypes.Email, email)
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
}
