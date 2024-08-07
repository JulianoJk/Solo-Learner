using backend;

public class RegisterGoogleUser
{
    private readonly AuthenticationUtils _authenticator;
    private readonly Dictionary<string, string> _responseDict;

    public RegisterGoogleUser(Dictionary<string, string> responseDict)
    {
        _authenticator = new AuthenticationUtils();
        _responseDict = responseDict;
    }


    public async Task HandleRegistrationRequest(
        HttpContext context,
        Dictionary<string, string> jwtData,
        string picture // Added parameter for picture
    )
    {
        string email = jwtData["email"];
        string firstName = jwtData.TryGetValue("given_name", out string givenName) ? givenName : null;
        string lastName = jwtData.TryGetValue("family_name", out string familyName) ? familyName : null;
        string username = jwtData["name"];
        bool isTeacher = IsTeacherEnv.Value.Contains(email);
        var (isTaken, newUsername) = _authenticator.IsUsernameTaken(username);
        if (isTaken)
        {
            username = newUsername;
        }

        // Call AuthenticateUser method on the AuthenticationUtils instance with register=true
        var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
            true,
            true,
            username,
            firstName,
            lastName,
            "",
            email,
            null,
            null,
            isTeacher,
            picture // Pass the picture parameter
        );


        if (AreCredentialsCorrect)
        {
            // Get additional user info from the database
            var additionalUserInfo = _authenticator.GetAdditionalUserInfoFromDb(email);

            // Update the response dictionary with additional information
            _responseDict["messageToUser"] = "Congratulations! Your account has been created!";
            _responseDict["authMethod"] = "Successful registration!";
            _responseDict["id"] = additionalUserInfo?.Id.ToString();
            _responseDict["isTeacher"] = additionalUserInfo?.IsTeacher.ToString().ToLower();
            _responseDict["isAdmin"] = additionalUserInfo?.IsAdmin.ToString().ToLower();
            _responseDict["picture"] = additionalUserInfo?.Picture.ToString();

            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(_responseDict);
        }
        else
        {
            var response = new { messageToUser };
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}