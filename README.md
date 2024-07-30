# Back-end

This is a simple API for managing a Todo list. It's built using .NET 6 and uses an in-memory database.

## Environment Configuration

To run this project, you'll need to configure environment variables using a `.env` file located in the root of the project. The `.env` file stores sensitive information and settings needed for your application to work properly. Below, you'll find instructions on how to set up the `.env` file for the back-end component.

### Back-End Configuration

1. If you don't already have an `.env` file in the root directory of the project, you can create one by copying the provided `.env_sample` file. Open a terminal and navigate to the root directory of the project: `$ cd /path/to/your/project`
2. Copy the `.env_sample` file and rename it to `.env`: `$ cp .env_sample .env`

3. Open the `.env` file in a text editor and update the following variables:

- `MYSQL_ROOT_PASSWORD`: Set this to the root password for your MySQL database.
- `CONNECTION_STRING`: Set this to your MySQL database connection string. For Docker Compose, it's typically `"server=db;port=3306;user=<your_database_user>;password=<your_database_password>;database=<your_database_name>"`.
- `JWT_KEY`: Choose a secret key for JSON Web Token (JWT) encryption.
- `JWT_EXPIRES_IN_MINUTES`: Set the expiration time for JWT tokens in minutes.
- `TEACHER_EMAIL`: Provide one or more teacher email addresses in a comma-separated list.

Here's an example of how your `.env` file might look after configuration:

```
env
MYSQL_ROOT_PASSWORD=myrootpassword
CONNECTION_STRING=server=db;port=3306;user=myuser;password=mypassword;database=mydatabase
JWT_KEY=mysecretkey
JWT_EXPIRES_IN_MINUTES=60
TEACHER_EMAIL=teacher1@example.com,teacher2@example.com
```

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
- [DragNDrop](https://www.npmjs.com/package/@hello-pangea/dnd)

```

```
