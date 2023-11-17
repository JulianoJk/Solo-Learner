using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend;
using MySql.Data.MySqlClient;
using Google.Apis.Auth;

public static class JwtUtils
{
    private static bool CheckToken(string token)
    {
        if (!IsJwtExpired(token))
        {
            if (HasGoogleIssuer(token) && IsGoogleToken(token))
            {
                return true; // Token is from Google
            }
            else if (ValidateJwt(token))
            {
                return true; // Token is validated using ValidateJwt
            }
        }

        return false;
    }

    private static bool HasGoogleIssuer(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            // Check if the token has an issuer and it is from Google
            return jwtToken?.Issuer == "https://accounts.google.com";
        }
        catch
        {
            // Handle exceptions if necessary
            return false;
        }
    }

    public static bool AuthenticateJwt(HttpContext context)
    {
        // Get the authorization header from the request
        string authHeader = context.Request.Headers["Authorization"];
        // Check if the header is present and contains a valid JWT
        if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
        {
            string jwt = authHeader.Substring("Bearer ".Length);

            if (CheckToken(jwt))
            {
                return true;
            }
        }

        return false;
    }

    private static bool IsGoogleToken(string token)
    {
        try
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(token).Result;

            // Check if the token has specific claims and audience (client ID) information
            if (
                payload != null
                && !string.IsNullOrEmpty(payload.Subject)
                && !string.IsNullOrEmpty(payload.Issuer)
                && payload.Audience != null
                && payload.Issuer == "https://accounts.google.com"
                && (string)payload.Audience == GoogleClientIdEnv.Value
            )
            {
                return true; // Token structure matches Google token
            }
        }
        catch (InvalidJwtException)
        {
            // The token is not a valid Google token.
        }

        return false; // Token is not a Google token
    }

    private static bool IsJwtExpired(string jwt)
    {
        // Decode the JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(jwt);

        // Check if the "exp" claim is present
        if (
            token.Payload.TryGetValue("exp", out var expClaimValue)
            && expClaimValue is long expTimestamp
        )
        {
            // Convert the exp timestamp to DateTime in local time
            var expDateTimeLocal = DateTimeOffset.FromUnixTimeSeconds(expTimestamp).LocalDateTime;
            Console.WriteLine($"Token expiration date: {expDateTimeLocal}");
            Console.WriteLine($"Current date: {DateTime.Now}");

            // Check if the token has expired
            return expDateTimeLocal < DateTime.Now;
        }

        // If "exp" claim is not present, consider the token as expired
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

    public static string GenerateJwt(string username, string email, bool isTeacher, bool isAdmin)
    {
        // Implement your user authentication logic here
        // ...
        return GenerateSecurityToken(
            username,
            email,
            isTeacher.ToString().ToLower(),
            isAdmin.ToString().ToLower()
        );
    }

    private static string GenerateSecurityToken(
        string username,
        string email,
        string isTeacher,
        string isAdmin
    )
    {
        var id = GetUserIdFromDB(email);
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(JwtKey.Value);
        var expires = DateTime.Now.AddMinutes(
            int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRES_IN_MINUTES") ?? "20")
        );

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new Claim[]
                {
                    new Claim("username", username),
                    new Claim(ClaimTypes.Email, email),
                    new Claim("isTeacher", isTeacher), // Pass the lowercase string here
                    new Claim("isAdmin", isAdmin), // Pass the lowercase string here
                    new Claim("id", id.ToString()),
                    new Claim(ClaimTypes.Role, "admin"),
                }
            ),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            ),
            Issuer = "http://localhost:3001", // Set your issuer URL here
            Audience = "http://localhost:3000",
        };

        // Create and sign the token
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);

        // Log the generated token for debugging
        Console.WriteLine($"Generated JWT: {jwtToken}");

        return jwtToken;
    }

    public static string? GetUserEmailFromJwt(HttpContext context)
    {
        if (AuthenticateJwt(context))
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

    public static bool GetIsTeacher(HttpContext context)
    {
        return GetIsTeacherFromJwt(context);
    }

    private static bool GetIsTeacherFromJwt(HttpContext context)
    {
        if (AuthenticateJwt(context))
        {
            string authHeader = context.Request.Headers["Authorization"];
            string jwt = authHeader.Substring("Bearer ".Length);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var token = tokenHandler.ReadJwtToken(jwt);
                var isUserATeacher = token.Claims.FirstOrDefault(c => c.Type == "isTeacher");
                if (isUserATeacher != null)
                {
                    return bool.Parse(isUserATeacher.Value);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating hash: {ex.Message}");
            }
        }

        return false;
    }

    public static int? GetUserId(string email)
    {
        return GetUserIdFromDB(email);
    }

    private static int? GetUserIdFromDB(string email)
    {
        int? id = null;
        using (var connection = new MySqlConnection(ConnectionString.Value))
        {
            connection.Open();
            using var command = new MySqlCommand(
                "SELECT id FROM users WHERE email=@Email",
                connection
            );
            command.Parameters.AddWithValue("@Email", email);
            var result = command.ExecuteScalar();
            if (result != null)
            {
                id = Convert.ToInt32(result);
            }
        }

        return id;
    }

    public static bool GetUserIsAdmin(HttpContext context)
    {
        return GetUserIsAdminFromJwt(context);
    }

    private static bool GetUserIsAdminFromJwt(HttpContext context)
    {
        if (AuthenticateJwt(context))
        {
            string authHeader = context.Request.Headers["Authorization"];
            string jwt = authHeader.Substring("Bearer ".Length);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var token = tokenHandler.ReadJwtToken(jwt);
                var isAdminClaim = token.Claims.FirstOrDefault(c => c.Type == "isAdmin");
                if (isAdminClaim != null)
                {
                    return bool.Parse(isAdminClaim.Value);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating hash: {ex.Message}");
            }
        }

        return false;
    }

    public static Dictionary<string, string> ExtractJwtData(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(jwt);
        var jwtData = new Dictionary<string, string>();

        foreach (var claim in token.Claims)
        {
            jwtData[claim.Type] = claim.Value;
        }

        return jwtData;
    }
}
