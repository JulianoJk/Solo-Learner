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

var app = builder.Build();

app.UseCors("AllowAll");

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
