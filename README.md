# Solo Learner Backend & Frontend

This project comprises a backend API for managing a Todo list and a frontend interface. The backend is built using .NET 6 with a MySQL database, while the frontend leverages various modern libraries and frameworks.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
   - [Backend Configuration](#backend-configuration)
2. [Installation and Build](#installation-and-build)
   - [Option 1: Local Machine](#option-1-local-machine)
   - [Option 2: Docker](#option-2-docker)
3. [Usage](#usage)
4. [Dependencies](#dependencies)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [Contributing](#contributing)
6. [License](#license)

## Environment Configuration

To run this project, configure environment variables using a `.env` file located in the project's root directory. This file stores sensitive information and settings necessary for the application's functionality.

### Backend Configuration

1. **Create an `.env` file**: If not already present, create an `.env` file by copying the provided `.env_sample` file.

   ```bash
   $ cd /path/to/your/project
   $ cp .env_sample .env
   ```

2. **Update the `.env` file**: Edit the `.env` file with your specific settings:

   - `MYSQL_ROOT_PASSWORD`: Set this to the root password for your MySQL database.
   - `CONNECTION_STRING`: Set this to your MySQL database connection string. For Docker Compose, it might be `"server=db;port=3306;user=<your_database_user>;password=<your_database_password>;database=<your_database_name>"`.
   - `JWT_KEY`: Choose a strong, random key for JSON Web Token (JWT) encryption.
   - `JWT_EXPIRES_IN_MINUTES`: Set the expiration time for JWT tokens in minutes.
   - `TEACHER_EMAIL`: Provide one or more teacher email addresses in a comma-separated list.

Example `.env` file:

```
MYSQL_ROOT_PASSWORD=myrootpassword
CONNECTION_STRING=server=db;port=3306;user=myuser;password=mypassword;database=mydatabase
JWT_KEY=mysecretkey
JWT_EXPIRES_IN_MINUTES=60
TEACHER_EMAIL=teacher1@example.com,teacher2@example.com
```

## Installation and Build

### Option 1: Local Machine

1. Clone this repository to your local machine.
2. Install the .NET 6 SDK if you haven't already. [Download .NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0).
3. Navigate to the project root directory.
4. Run `dotnet build` to build the project.
5. Run `dotnet run` to start the server.

### Option 2: Docker

#### Using Docker Compose

1. Navigate to the project root directory.
2. Start the Docker containers:

   ```
   docker-compose up
   ```

## Usage

The API provides the following endpoints:

- `GET /`: Returns a welcome message.
- `POST /users/login`: Authenticates a user.
- `POST /users/register`: Registers a new user.
- `GET /users/profile`: Retrieves user profile information (requires authentication).

For `POST` routes, the request body should be in JSON format.

## Dependencies

### Backend

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

Install them using:

```bash
dotnet add package <package-name>
```

### Frontend

The frontend utilizes several libraries and packages, including but not limited to:

- [react-easy-crop](https://www.npmjs.com/package/react-easy-crop)
- [DragNDrop](https://www.npmjs.com/package/@hello-pangea/dnd)
- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
- [Tabler Icons for React](https://tabler.io/docs/icons/react)

For a full list of frontend dependencies, refer to the `package.json` file.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
