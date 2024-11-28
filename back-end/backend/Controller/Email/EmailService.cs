using Microsoft.Graph;
using Microsoft.Identity.Client;
using MimeKit;
using System;
using System.Threading.Tasks;

namespace backend
{
    public class EmailService
    {
        private readonly string _clientId = Environment.GetEnvironmentVariable("CLIENT_ID"); // From Azure App Registration
        private readonly string _clientSecret = Environment.GetEnvironmentVariable("CLIENT_SECRET"); // From Azure App Registration
        private readonly string _tenantId = Environment.GetEnvironmentVariable("TENANT_ID"); // From Azure App Registration
        private readonly string _emailFrom = Environment.GetEnvironmentVariable("EMAIL_FROM");

        public EmailService()
        {
        }

        private async Task<string> GetAccessTokenAsync()
        {
            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder.Create(_clientId)
                .WithClientSecret(_clientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{_tenantId}"))
                .Build();

            var result = await confidentialClientApplication.AcquireTokenForClient(new[] { "https://graph.microsoft.com/.default" }).ExecuteAsync();

            return result.AccessToken;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var accessToken = await GetAccessTokenAsync();

            var client = new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    async (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                    }));

            var message = new Message
            {
                Subject = subject,
                Body = new ItemBody
                {
                    ContentType = BodyType.Text,
                    Content = body
                },
                ToRecipients = new List<Recipient>
                {
                    new Recipient
                    {
                        EmailAddress = new EmailAddress
                        {
                            Address = toEmail
                        }
                    }
                }
            };

            try
            {
                await client.Users[_emailFrom].SendMail(message, true).Request().PostAsync();
                Console.WriteLine("Email sent successfully.");
            }
            catch (ServiceException ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }
    }
}
