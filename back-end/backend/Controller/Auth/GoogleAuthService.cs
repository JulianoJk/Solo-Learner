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

            // Parse the JSON response
            var responseDict = Newtonsoft.Json.JsonConvert.DeserializeObject<
                Dictionary<string, string>
            >(responseContent);
            var userJwt = responseDict["id_token"];
            var jwtData = JwtUtils.ExtractJwtData(userJwt);

            // Get the email from the jwt data
            if (jwtData.TryGetValue("email", out string userEmail))
            {
                string isUserRegistered = _authenticator.GetUserEmailFromGoogleId(userEmail);
                if (isUserRegistered != null)
                {
                    string messageToUser = $"User with email {userEmail} is registered.";
                    // You can proceed with further actions for registered users.
                    // Return a successful response with a 200 status code
                    var responses = new { messageToUser };
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    await context.Response.WriteAsJsonAsync(responseDict);
                }
                else
                {
                    // string messageToUser = $"User with email {userEmail} is NOT registered.";
                    // var responses = new { messageToUser };
                    // context.Response.StatusCode = StatusCodes.Status404NotFound;
                    // await context.Response.WriteAsJsonAsync(responses);

                    RegisterGoogleUser registerGoogleUser = new RegisterGoogleUser();
                    await registerGoogleUser.HandleRegistrationRequest(context, jwtData);
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = "Email not found in the JWT data." });
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }
}