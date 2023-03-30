using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

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
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("your_security_key_here")
            ),
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();

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

app.Run();
