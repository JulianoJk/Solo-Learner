using System.Text.Json;
using backend;
public class GoogleAuthService
{
    private readonly AuthenticationUtils _authenticator;
    private readonly EmailService _emailService;

    public GoogleAuthService()
    {
        _authenticator = new AuthenticationUtils();
        _emailService = new EmailService();
    }

    public async Task HandleGoogleAuthRequest(HttpContext context)
    {
        UserRepository userRepository = new UserRepository();
        string code = null;

        if (context.Request.HasFormContentType)
        {
            var form = await context.Request.ReadFormAsync();
            code = form["code"];
        }

        if (string.IsNullOrWhiteSpace(code))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(
                new { error = "Missing or empty 'code' parameter in the request body." }
            );
            return;
        }

        try
        {
            var responseDict = await AuthenticateGoogleUser(code);

            if (responseDict.TryGetValue("email", out string userEmail))
            {
                string isUserRegistered = _authenticator.GetUserEmailFromGoogleId(userEmail);
                if (isUserRegistered != null)
                {
                    // Check if login method matches
                    if (_authenticator.GetAuthMethod(userEmail) != "Google")
                    {
                        await _emailService.SendEmailAsync(
                            userEmail,
                            "Mismatched Login Method",
                            "It seems you registered with a different method. Please log in using your original registration method or contact support."
                        );

                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsJsonAsync(
                            new { error = "Please log in using your original registration method." }
                        );
                        return;
                    }

                    // Generate JWT token and proceed with login
                    var additionalUserInfo = _authenticator.GetAdditionalUserInfoFromDb(userEmail);
                    string token = JwtUtils.GenerateJwt(userEmail, additionalUserInfo?.Id.ToString(), additionalUserInfo.IsTeacher, additionalUserInfo.IsAdmin);

                    responseDict["jwt_token"] = token;
                    responseDict["messageToUser"] = "Great to see you! You're all set to go! :)";
                    responseDict["authMethod"] = "Login successful!";
                    responseDict["id"] = additionalUserInfo?.Id.ToString();
                    responseDict["isTeacher"] = additionalUserInfo?.IsTeacher.ToString().ToLower();
                    responseDict["isAdmin"] = additionalUserInfo?.IsAdmin.ToString().ToLower();
                    responseDict["picture"] = additionalUserInfo?.Picture;

                    await userRepository.UpdateUserIsLoggedIn(true, userEmail);
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.WriteAsJsonAsync(responseDict);
                }
                else
                {
                    // Handle new user registration
                    RegisterGoogleUser registerGoogleUser = new RegisterGoogleUser(responseDict);
                    await registerGoogleUser.HandleRegistrationRequest(
                        context,
                        responseDict,
                        responseDict["picture"]
                    );
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(
                    new { error = "Email not found in the JWT data." }
                );
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }

    private async Task<Dictionary<string, string>> AuthenticateGoogleUser(string code)
    {
        var googleClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
        var googleClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");


        var client = new HttpClient();
        var request = new HttpRequestMessage(
            HttpMethod.Post,
            "https://oauth2.googleapis.com/token"
        );
        request.Content = new FormUrlEncodedContent(
            new Dictionary<string, string>
            {
                ["code"] = code,
                ["client_id"] = googleClientId,
                ["client_secret"] = googleClientSecret,
                ["redirect_uri"] = "postmessage",
                ["grant_type"] = "authorization_code"
            }
        );

        var response = await client.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Response from Google Token Exchange: " + responseContent);

        var responseDict = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(responseContent);

        if (responseDict.TryGetValue("access_token", out string accessToken))
        {
            var userInfoRequest = new HttpRequestMessage(
                HttpMethod.Get,
                "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
            );
            userInfoRequest.Headers.Add("Authorization", $"Bearer {accessToken}");

            var userInfoResponse = await client.SendAsync(userInfoRequest);
            var userInfoContent = await userInfoResponse.Content.ReadAsStringAsync();
            var userInfoDict = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(userInfoContent);

            if (responseDict.TryGetValue("id_token", out string idToken))
            {
                userInfoDict["id_token"] = idToken;
            }

            return userInfoDict;
        }

        return responseDict;
    }
}
