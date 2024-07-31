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

```env
MYSQL_ROOT_PASSWORD=myrootpassword
CONNECTION_STRING=server=db;port=3306;user=myuser;password=mypassword;database=mydatabase
JWT_KEY=mysecretkey
JWT_EXPIRES_IN_MINUTES=60
TEACHER_EMAIL=teacher1@example.com,teacher2@example.com
```
