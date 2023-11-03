using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using backend;
using System.Security.Claims;
using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Requests;
using Google.Apis.Auth.OAuth2.Responses;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "localhost",
            ValidAudience = "localhost",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey.Value)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapGet(
    "/",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            await context.Response.WriteAsync("This is index route!");
        }
        else
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized.");
        }
    }
);
app.MapGet(
    "/users/checkToken",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            UserRepository userRepository = new UserRepository();
            await userRepository.GetLastActive(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

// Existing routes and authentication setup

app.MapPost(
    "/users/login",
    async (HttpContext context) =>
    {
        LoginUser loginUser = new LoginUser();
        await loginUser.HandleLoginRequest(context);
    }
);

app.MapPost(
    "/users/register",
    (HttpContext context) =>
    {
        RegisterUser registerUser = new();
        registerUser.HandleRegistrationRequest(context);
        return Task.CompletedTask;
    }
);

// TODO!: Share client google token
app.MapGet(
    "/api/auth/google-client-id",
    (HttpContext context) =>
    {
        try
        {
            var googleClientId = GoogleClientIdEnv.Value;

            if (string.IsNullOrEmpty(googleClientId))
            {
                // If GOOGLE_CLIENT_ID is not found or empty, return an error
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                return context.Response.WriteAsJsonAsync(
                    new
                    {
                        status = "error",
                        code = StatusCodes.Status500InternalServerError,
                        message = "GOOGLE_CLIENT_ID not found in environment variables."
                    }
                );
            }

            // Return the GOOGLE_CLIENT_ID
            return context.Response.WriteAsJsonAsync(
                new { status = "completed", id = googleClientId }
            );
        }
        catch (Exception ex)
        {
            // Handle any exceptions
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            return context.Response.WriteAsJsonAsync(
                new
                {
                    status = "error",
                    code = StatusCodes.Status500InternalServerError,
                    message = ex.Message
                }
            );
        }
    }
);
var clientId = "563283815960-enf7c098qsd0csoejb7q3fup352ci8gf.apps.googleusercontent.com";
var clientSecret = "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";
var redirectUri = "http://localhost:3000/api/auth/google"; // Use one of the allowed redirect URIs

app.MapPost(
    "/auth/google",
    async (HttpContext context) =>
    {
        try
        {
            // Extract the authorization code from the request
            string code = context.Request.Form["code"];

            // Exchange the code for access and refresh tokens
            TokenResponse tokens = await ExchangeCodeForTokens(
                code,
                redirectUri,
                clientId,
                clientSecret
            );

            // Return the tokens as a JSON response
            await context.Response.WriteAsJsonAsync(tokens);
        }
        catch (Exception ex)
        {
            // Handle any errors
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }
);

// Handle refreshing the access token
app.MapPost(
    "/auth/google/refresh-token",
    async (HttpContext context) =>
    {
        try
        {
            // Extract the refresh token from the request body
            string refreshToken = context.Request.Form["refreshToken"];

            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                return;
            }

            // Use the refresh token to obtain a new access token
            var newAccessToken = await RefreshAccessToken(refreshToken, clientId, clientSecret);

            // Respond with the new access token
            await context.Response.WriteAsJsonAsync(newAccessToken);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }
);

async Task<TokenResponse> ExchangeCodeForTokens(
    string code,
    string redirectUri,
    string clientId,
    string clientSecret
)
{
    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(
        new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets { ClientId = clientId, ClientSecret = clientSecret, },
            Scopes = new[] { "openid", "email", "profile" },
        }
    );

    TokenResponse token = await flow.ExchangeCodeForTokenAsync(code, redirectUri, clientSecret, CancellationToken.None);

    return token;
}

async Task<TokenResponse> RefreshAccessToken(
    string refreshToken,
    string clientId,
    string clientSecret
)
{
    GoogleAuthorizationCodeFlow.Initializer initializer =
        new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets { ClientId = clientId, ClientSecret = clientSecret, },
        };

    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(initializer);
    UserCredential credential = new UserCredential(
        flow,
        "user-id",
        new TokenResponse { RefreshToken = refreshToken, }
    );

    await credential.RefreshTokenAsync(CancellationToken.None);

    return credential.Token;
}

// app.MapGet(
//     "/users/profile",
//     async (HttpContext context) =>
//     {
//         bool isValidJwt = JwtUtils.authenticateJwt(context);

//         if (isValidJwt)
//         {
//             ProfileController profileController = new ProfileController();
//             await profileController.GetProfile(context);
//         }
//         else
//         {
//             var response = new { error = new { message = "Unauthorized" } };
//             context.Response.StatusCode = StatusCodes.Status401Unauthorized;
//             await context.Response.WriteAsJsonAsync(response);
//         }
//     }
// );
app.MapDelete(
    "/users/delete",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            AccountDeletionController accountDeletion = new();
            await accountDeletion.InitAccountDeletion(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

app.MapPut(
    "/users/update/username",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            ProfileController profileController = new();
            await profileController.ChangeUsernameAsync(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);
app.MapGet(
    "/admin/dashboard",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);
        if (isValidJwt && JwtUtils.GetUserIsAdmin(context))
        {
            AdminController adminController = new AdminController();
            await adminController.GetDashboard(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);
app.MapGet(
    "/admin/users/all/list",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);
        if (isValidJwt && JwtUtils.GetUserIsAdmin(context))
        {
            AdminController adminController = new AdminController();
            await adminController.GetUsers(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

app.MapDelete(
    "/admin/dashboard/delete_user",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt && JwtUtils.GetUserIsAdmin(context))
        {
            AdminAccountDeletionController adminAccountDeletion =
                new AdminAccountDeletionController();
            await adminAccountDeletion.InitAccountDeletion(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);
app.MapGet(
    "/users/profile",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            // Read the username from the query string
            if (context.Request.Query.TryGetValue("username", out var usernameValues))
            {
                string username = usernameValues.First();

                ProfileController profileController = new ProfileController();
                await profileController.GetProfile(context, username);
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(
                    "Bad request. Username parameter is required."
                );
            }
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);
app.MapGet("/username/{name}", (string name) => $"Hello {name}");

app.MapGet(
    "/profile/testme/{username}",
    async (HttpContext context, string username) =>
    {
        ProfileController profileController = new ProfileController();
        await profileController.GetProfile(context, username);
    }
);

app.MapGet(
    "/user/current_user",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            UserRepository userRepository = new UserRepository();
            await userRepository.GetCurrentUser(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

app.Run();
