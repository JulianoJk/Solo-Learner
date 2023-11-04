using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using backend;

public class RegisterGoogleUser
{
    private readonly AuthenticationUtils _authenticator;

    public RegisterGoogleUser()
    {
        _authenticator = new AuthenticationUtils();
    }

    public async Task HandleRegistrationRequest(
        HttpContext context,
        Dictionary<string, string> jwtData,
        string googleToken
    )
    {
        string email = jwtData["email"];
        string firstName = jwtData["given_name"];
        string lastName = jwtData["family_name"];
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
            isTeacher
        );
        if (AreCredentialsCorrect)
        {
            var response = new { messageToUser, googleToken };
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(response);
        }
        else
        {
            var response = new { messageToUser };
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}