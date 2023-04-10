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
        await context.Response.WriteAsync("This is index route!");
    }
);

app.MapPost(
    "/login",
    (HttpContext context) =>
    {
        LoginUser loginUser = new LoginUser();
        loginUser.HandleLoginRequest(context);
        return Task.CompletedTask;
    }
);

app.MapPost(
    "/register",
    (HttpContext context) =>
    {
        RegisterUser registerUser = new RegisterUser();
        registerUser.HandleRegistrationRequest(context);
        return Task.CompletedTask;
    }
);

// This is a sample route for testing authentication
app.MapGet(
    "/protected",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.ValidateJwt(context);

        if (isValidJwt)
        {
            await context.Response.WriteAsync("This is a protected route!");
        }
        else
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Hello, you are not going to procced");
        }
    }
);

app.Run();
