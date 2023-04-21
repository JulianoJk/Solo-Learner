# Back-end

This is a simple API for managing a Todo list. It's built using .NET 6 and uses an in-memory database.

## Installation and Build

### Option 1: Local machine

1. Clone this repository to your local machine.
2. Install .NET 6 SDK if you haven't already. You can download it from [here](https://dotnet.microsoft.com/download/dotnet/6.0).
3. Open a terminal in the root directory of the project.
4. Run `dotnet build` to build the project.
5. Run `dotnet run` to start the server.

### Option 2: Docker

#### Option 2.1: Using Docker Compose

1. Open a terminal and navigate to the root directory of the project.
2. Run the following command to start the Docker container: `docker-compose up`

## Usage

The following routes are available:

- `GET /`: Returns a string "Hello user".
- `POST /users/login`: Authenticates a user and returns a message indicating success or failure.
- `POST /users/register`: Registers a new user and returns a message indicating success or failure.
- `GET /users/profile`: Returns user profile information if authenticated.

For `POST` routes, the request body must be in JSON format.

## Dependencies

This project uses the following NuGet packages:

- Microsoft.AspNetCore
- dotenv.net
- MySql.Data
- MailKit
- Microsoft.AspNetCore.Authentication.JwtBearer --version 6.0.0
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.IdentityModel.Tokens
- Microsoft.AspNetCore.Cors

You can install them using the following command:

dotnet add package <package-name>

## Contributing

If you find a bug or have a suggestion for a new feature, feel free to open an issue or submit a pull request.

# FRONT_END:

## Libraries Used:

- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
<!-- - [Tabler Icons for React](https://tabler-icons-react.vercel.app/) -->
- [Tabler Icons for React](https://tabler.io/docs/icons/react)

- [react-easy-crop](https://www.npmjs.com/package/react-easy-crop?activeTab=readme)
