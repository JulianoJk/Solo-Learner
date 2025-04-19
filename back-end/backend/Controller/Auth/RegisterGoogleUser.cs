using backend;
using System.Net;
using System.Net.Mail;

public class RegisterGoogleUser
{
    private readonly AuthenticationUtils _authenticator;
    private readonly Dictionary<string, string> _responseDict;
    private readonly EmailService _emailService;

    public RegisterGoogleUser(Dictionary<string, string> responseDict)
    {
        _authenticator = new AuthenticationUtils();
        _responseDict = responseDict;
        _emailService = new EmailService();
    }

    public async Task HandleRegistrationRequest(
        HttpContext context,
        Dictionary<string, string> jwtData,
        string picture
    )
    {
        string email = jwtData["email"];
        string firstName = jwtData.TryGetValue("given_name", out string givenName) ? givenName : "";
        string lastName = jwtData.TryGetValue("family_name", out string familyName) ? familyName : "";
        string username = jwtData["name"];
        string middleName = ""; // Google doesn't provide it, so we leave it empty
        string phoneNumber = null;
        string countryName = null;
        string countryFlag = null;
        bool mustChangePassword = false;
        
        bool isTeacher = IsTeacherEnv.Value.Contains(email);
        bool isStudent = !isTeacher;

        var (isTaken, newUsername) = _authenticator.IsUsernameTaken(username);
        if (isTaken)
        {
            username = newUsername;
        }

        // Call AuthenticateUser with the updated parameters
        var (AreCredentialsCorrect, messageToUser) = _authenticator.AuthenticateUser(
            isRegister: true,
            isGoogle: true,
            username: username,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            gender: "", // Not available from Google
            email: email,
            password: "", // Google doesn't use password here
            salt: null,
            isTeacher: isTeacher,
            isStudent: isStudent,
            picture: picture,
            phoneNumber: phoneNumber,
            countryName: countryName,
            countryFlag: countryFlag,
            mustChangePassword: false
        );

        if (AreCredentialsCorrect)
        {
            var additionalUserInfo = _authenticator.GetAdditionalUserInfoFromDb(email);

            _responseDict["messageToUser"] = "Congratulations! Your account has been created!";
            _responseDict["authMethod"] = "Successful registration!";
            _responseDict["id"] = additionalUserInfo?.Id.ToString();
            _responseDict["isTeacher"] = additionalUserInfo?.IsTeacher.ToString().ToLower();
            _responseDict["isStudent"] = additionalUserInfo?.isStudent.ToString().ToLower();
            _responseDict["isAdmin"] = additionalUserInfo?.IsAdmin.ToString().ToLower();
            _responseDict["picture"] = additionalUserInfo?.Picture;

            await SendRegistrationEmailAsync(email);

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

    private async Task SendRegistrationEmailAsync(string userEmail)
    {
        try
        {
            await _emailService.SendEmailAsync(
                userEmail,
                "Registration Successful",
                "Thank you for registering with our platform via Google! We're excited to have you on board."
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending registration email: {ex.Message}");
        }
    }
}
