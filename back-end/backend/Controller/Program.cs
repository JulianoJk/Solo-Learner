using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using backend;

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
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtKey.Value)),
            ValidateIssuer = true,
            ValidIssuer = "http://localhost:3001",
            ValidateAudience = true,
            ValidAudience = "http://localhost:3000",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(5) // Set a reasonable clock skew
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
        string navigateUser;

        if (JwtUtils.IsUserLoggedIn(context, out navigateUser))
        {
            // User is logged in
            context.Response.StatusCode = StatusCodes.Status200OK;

            // Include additional property for navigation
            var response = new
            {
                status = "success",
                message = "User is logged in.",
                navigateUser = navigateUser
            };

            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            // User is not logged in
            var response = new { status = "success", message = "User is NOT LOGGED IN" };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
);

app.MapGet(
    "/users/checkToken",
    async (HttpContext context) =>
    {
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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

app.MapPost(
    "/users/login",
    async context =>
    {
        string navigateUser;

        if (JwtUtils.IsUserLoggedIn(context, out navigateUser))
        {
            // User is already logged in
            context.Response.StatusCode = StatusCodes.Status200OK;

            // Include additional property for navigation
            var response = new
            {
                status = "success",
                message = "User is already logged in.",
                navigateUser = navigateUser
            };

            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            // User is not logged in, handle login logic
            LoginUser loginUser = new LoginUser();
            await loginUser.HandleLoginRequest(context);
        }
    }
);

app.MapPost(
    "/users/register",
    async context =>
    {
        string navigateUser;

        if (JwtUtils.IsUserLoggedIn(context, out navigateUser))
        {
            // User is already logged in
            context.Response.StatusCode = StatusCodes.Status200OK;

            // Include additional property for navigation
            var response = new
            {
                status = "success",
                message = "User is already logged in.",
                navigateUser = navigateUser
            };

            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            // User is not logged in, handle registration logic
            RegisterUser registerUser = new RegisterUser();
            await registerUser.HandleRegistrationRequest(context);
        }
    }
);
app.MapPost(
    "/admin/dashboard/register-new-user",
    async context =>
    {
        if (JwtUtils.IsUserLoggedIn(context, out _))
        {
            // User is already logged in
            context.Response.StatusCode = StatusCodes.Status200OK;

            // Include additional property for navigation
            var response = new { status = "success", message = "User is already logged in.", };

            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            // User is not logged in, handle registration logic
            RegisterUser registerUser = new RegisterUser();
            await registerUser.HandleRegistrationRequest(context);
        }
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

// app.MapPost(
//     "/signin-google",
//     async (HttpContext context) =>
//     {
//         GoogleAuthService googleAuthService = new GoogleAuthService();
//         await googleAuthService.HandleGoogleAuthRequest(context);
//     }
// );
app.MapPost(
    "/signin-google",
    async (HttpContext context) =>
    {
        try
        {
            // Call the HandleGoogleAuthRequest method
            var authService = new GoogleAuthService();
            await authService.HandleGoogleAuthRequest(context);
        }
        catch (Exception ex)
        {
            // Return an error response
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }
);

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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);
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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);
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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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
        bool isValidJwt = JwtUtils.AuthenticateJwt(context);

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

// Map the route for the Logout operation
app.MapPut(
    "/user/logout",
    async (HttpContext context) =>
    {
        AuthenticationManager authenticationManager = new AuthenticationManager();
        await authenticationManager.Logout(context);
    }
);
app.MapPost(
    "/upload",
    async (HttpContext context, GoogleDriveService googleDriveService) =>
    {
        var file = context.Request.Form.Files.FirstOrDefault();

        if (file != null && file.Length > 0)
        {
            // Specify the file path, name, and content type
            var filePath = Path.GetTempFileName(); // Save the file temporarily
            var fileName = file.FileName;
            var contentType = file.ContentType;

            // Save the uploaded file to a temporary location
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Upload the file to Google Drive
            var fileId = await googleDriveService.UploadFileAsync(filePath, fileName, contentType);

            // Return the fileId or any other response as needed
            await context.Response.WriteAsync($"File uploaded successfully. File ID: {fileId}");

            // Clean up the temporary file
            File.Delete(filePath);
        }
        else
        {
            // No file found in the request
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("No file found in the request.");
        }
    }
);

app.Run();
