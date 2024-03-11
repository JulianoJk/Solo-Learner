using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

public class GoogleDriveService
{
    public async Task<string> UploadFileAsync(string filePath, string fileName, string contentType)
    {
        UserCredential credential;

        string credentialsPath =
            Path.Combine(Directory.GetCurrentDirectory(), "back-end", "backend", "credentials.json");

        using (var stream = new FileStream(credentialsPath, FileMode.Open, FileAccess.Read))
        {
            string credPath = "token.json";
            credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                GoogleClientSecrets.Load(stream).Secrets,
                new[] { DriveService.ScopeConstants.DriveFile },
                "user",
                CancellationToken.None,
                new FileDataStore(credPath, true));
        }

        var service = new DriveService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "Your Application Name",
        });

        var fileMetadata = new Google.Apis.Drive.v3.Data.File();
        fileMetadata.Name = fileName;

        FilesResource.CreateMediaUpload request;

        using (var stream = new FileStream(filePath, FileMode.Open))
        {
            request = service.Files.Create(fileMetadata, stream, contentType);
            request.Fields = "id";
            await request.UploadAsync();
        }

        return request.ResponseBody.Id;
    }
}