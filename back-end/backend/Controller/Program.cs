using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using backend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        corsPolicyBuilder =>
        {
            corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
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

app.MapPost(
    "/users/login",
    async (HttpContext context) =>
    {
        LoginUser loginUser = new LoginUser();
        await loginUser.HandleLoginRequest(context);
        return Task.CompletedTask;
    }
);

app.MapPost(
    "/users/register",
    async (HttpContext context) =>
    {
        RegisterUser registerUser = new RegisterUser();
        await registerUser.HandleRegistrationRequest(context);
        return Task.CompletedTask;
    }
);
app.MapGet(
    "/users/profile",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            await ProfileController.GetProfile(context);
        }
        else
        {
            var response = new { error = new { message = "Unauthorized" } };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

// This is a sample route for testing authentication
app.MapGet(
    "/protected",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.authenticateJwt(context);

        if (isValidJwt)
        {
            await context.Response.WriteAsync("Everything is okay to go!");
        }
        else
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized.");
        }
    }
);

app.Run();
