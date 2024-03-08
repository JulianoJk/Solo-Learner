using System.Text.Json;
using backend;

public class GoogleAuthService
{
    private readonly AuthenticationUtils _authenticator;

    public GoogleAuthService()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async Task HandleGoogleAuthRequest(HttpContext context)
    {
        UserRepository userRepository = new UserRepository();
        string code = null;
        var googleClientId = GoogleClientIdEnv.Value;
        var googleClientSecret = GoogleClientSecretEnv.Value;

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
            var responseDict = Newtonsoft.Json.JsonConvert.DeserializeObject<
                Dictionary<string, string>
            >(responseContent);
            var userJwt = responseDict["id_token"];
            var jwtData = JwtUtils.ExtractJwtData(userJwt);

            if (jwtData.TryGetValue("email", out string userEmail))
            {
                string isUserRegistered = _authenticator.GetUserEmailFromGoogleId(userEmail);
                if (isUserRegistered != null)
                {
                    // Retrieve additional user information from the database
                    var additionalUserInfo = _authenticator.GetAdditionalUserInfoFromDb(userEmail);

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
                    RegisterGoogleUser registerGoogleUser = new RegisterGoogleUser(responseDict);
                    // Pass the 'picture' from jwtData to HandleRegistrationRequest
                    await registerGoogleUser.HandleRegistrationRequest(
                        context,
                        jwtData,
                        jwtData["picture"]
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

    public async Task<Dictionary<string, string>> AuthenticateGoogleUser(string code)
    {
        var googleClientId = GoogleClientIdEnv.Value;
        var googleClientSecret = GoogleClientSecretEnv.Value;

        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, "https://oauth2.googleapis.com/token");
        request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["code"] = code,
            ["client_id"] = googleClientId,
            ["client_secret"] = googleClientSecret,
            ["redirect_uri"] = "postmessage",
            ["grant_type"] = "authorization_code"
        });

        var response = await client.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();
        var responseDict = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(responseContent);

        return responseDict;
    }
}