# Solo Learner Backend & Frontend

## Table of Contents

1. [Project Overview](#project-overview)
   - [Description](#description)
   - [Purpose](#purpose)
2. [Environment Configuration](#environment-configuration)
   - [Backend Configuration](#backend-configuration)
3. [Installation and Build](#installation-and-build)
   - [Using Docker Compose](#using-docker-compose)
4. [Usage](#usage)
5. [Dependencies](#dependencies)
   - [Backend](#backend)
   - [Frontend](#frontend)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

This project is a comprehensive online web application designed to facilitate language learning for people of all ages. Developed by a diverse team of students from various fields, including Computer Science, English Language & Literature, Business Management, Fine Arts, Business & Management, and Eco-technology, the platform addresses common limitations found in existing language learning apps.

### Description

Our application is designed to provide a robust and accessible language learning experience. Unlike many existing platforms that require subscriptions, our project aims to offer a versatile solution with the following features:

- **Inclusive Learning:** The platform is designed for users of all ages, from young learners to adults, making it a valuable resource for anyone interested in learning or improving their language skills.
- **Teacher and Tutor Integration:** Educators and private tutors will have the ability to create, manage, and customize their own lessons and courses. This allows them to tailor their teaching materials to better meet their students' needs.
- **Teacher Admin Tools:** Teachers will have admin-like capabilities within their own domains. They can manage their students, monitor progress, assign assignments and tests, and track student performance. This includes the ability to register and remove students from their classes.
- **Subscription-Free Model:** Unlike many online learning apps that charge subscription fees, our platform is designed to be accessible without recurring costs. This ensures that learners and educators can use the platform without financial barriers.
- **Enhanced Educational Tools:** Tutors will have access to a range of tools and features to create engaging lessons, including the ability to upload course materials, design tests, and provide comprehensive learning resources such as grammar theory and practical exercises.
- **Admin Dashboard:** The platform will include an admin dashboard panel for comprehensive management of the system and user data, enabling oversight and operational control.

### Purpose

The primary goal of this project is to provide a free and user-friendly platform that supports effective language learning while overcoming the limitations of existing solutions. By focusing on accessibility and customization, the platform empowers both learners and educators to have a more tailored and engaging educational experience. The application is being developed with the belief that quality language education should be available to everyone, regardless of age or financial constraints. The project is still a work in progress, with ongoing updates and enhancements based on user feedback and evolving educational needs.

Our vision is to create a collaborative and dynamic learning environment that benefits a diverse audience and fosters a more inclusive approach to education.

**Note:** The project is still in progress. We are continuously working on adding new features, improving existing functionalities, and addressing feedback from users. Our vision is to create a collaborative and dynamic learning environment that benefits a diverse audience and fosters a more inclusive approach to education.

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
   - `IP_ADDRESS`: Provide the IP address of the database server or any necessary external service (e.g., 192.168.1.100).

Please ensure to check the `.env_sample` file for additional guidance on each setting.

Example `.env` file:

```
MYSQL_ROOT_PASSWORD=myrootpassword
CONNECTION_STRING=server=db;port=3306;user=myuser;password=mypassword;database=mydatabase
JWT_KEY=mysecretkey
JWT_EXPIRES_IN_MINUTES=60
TEACHER_EMAIL=teacher1@example.com,teacher2@example.com
IP_ADDRESS="192.168.1.100"
```

## Installation and Build

#### Using Docker Compose

1. Navigate to the project root directory.
2. Start the Docker containers:
   `docker-compose up`

## Usage

The following routes are available:

- `GET /`: Returns a greeting message and indicates if the user is logged in.
- `POST /users/login`: Authenticates a user and returns a message indicating success or failure.
- `POST /users/register`: Registers a new user and returns a message indicating success or failure.
- `GET /users/checkToken`: Checks the validity of a JWT token.
- `DELETE /users/delete`: Deletes a user account if authenticated.
- `PUT /users/update/username`: Updates a user's username if authenticated.
- `GET /admin/dashboard`: Returns admin dashboard data if the user is authenticated and an admin.
- `GET /admin/users/all/list`: Returns a list of all users if the user is authenticated and an admin.
- `DELETE /admin/dashboard/delete_user`: Deletes a user account by an admin.
- `GET /users/profile`: Returns profile information for a specific user.
- `GET /username/{name}`: Returns a greeting message for the specified username.
- `GET /profile/testme/{username}`: Returns test profile information for the specified username.
- `GET /user/current_user`: Returns information about the current logged-in user.
- `PUT /user/logout`: Logs out the current user.
- `POST /upload`: Handles file upload to Google Drive.
- `POST /signin-google`: Handles Google sign-in authentication.

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

### Frontend

The frontend utilizes several libraries and packages, including but not limited to:

- [react-easy-crop](https://www.npmjs.com/package/react-easy-crop)
- [DragNDrop](https://www.npmjs.com/package/@hello-pangea/dnd)
- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
- [Tabler Icons for React](https://tabler.io/docs/icons/react)
- [react-international-phone](https://react-international-phone.vercel.app/)

For a full list of frontend dependencies, refer to the `package.json` file.

## Frontend Setup

To work with the frontend code, follow these steps:

1. **Install Node.js and Yarn**: Ensure that Node.js and Yarn are installed on your system. You can download Node.js from [nodejs.org](https://nodejs.org/) and Yarn from [yarnpkg.com](https://yarnpkg.com/).

2. **Navigate to the Frontend Directory**: Go to the `front_end` folder within the project directory:

   ```bash
   cd /path/to/your/project/front_end
   ```

3. **Install Dependencies**: Run the following command to install all necessary dependencies:

   ```bash
   yarn
   ```

4. **Start the Development Server**: Run the following command to start the frontend development server:

   ```bash
   yarn dev
   ```

   This will start the development server and make the frontend application available for local development.

**Note:** If you simply want to run the entire application without making changes, running `docker-compose up` in the project root directory will start both the backend and frontend applications seamlessly.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
