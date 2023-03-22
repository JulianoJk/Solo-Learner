﻿# TodoList API

This is a simple API for managing a Todo list. It's built using .NET 6 and uses an in-memory database.

## Installation

1. Clone this repository to your local machine.
2. Install .NET 6 SDK if you haven't already. You can download it from [here](https://dotnet.microsoft.com/download/dotnet/6.0).
3. Open a terminal in the root directory of the project.
4. Run `dotnet build` to build the project.
5. Run `dotnet run` to start the server.

## Usage

The following routes are available:

- `GET /`: Returns a string "Hello user".
- `POST /login`: Authenticates a user and returns a message indicating success or failure.

For `POST` routes, the request body must be in JSON format.

## Dependencies

This project uses the following NuGet packages:

- Microsoft.AspNetCore.Cors
- Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
- Microsoft.AspNetCore
- dotenv.net
- MySql.Data
- MailKit
You can install them using the following command:

dotnet add package <package-name>

## Contributing

If you find a bug or have a suggestion for a new feature, feel free to open an issue or submit a pull request.
# auth_dotnet
# auth_dotnet