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
            await context.Response.WriteAsJsonAsync(responseDict);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
    }
}