# **Solo-learner (M.E.R.N. Stack)**

Welcome to our Solo-learn project app, where you can learn foreign languages free! This project is a full-stack web application developed by a team of students from a variety of disciplines, including Computer Science, English Language & Literature, and Fine Arts.

## **Overview**

Our Solo-learner platform is a language learning platform that allows users to practice their language skills through interactive exercises and games. Some of the key features of the platform include:

- A variety of exercises and games to practice reading, writing, speaking, and listening skills
- Progress tracking to help users stay motivated and see their improvement over time

<h2><font color="#92D1C3"><strong><ins>Setting Up the Project</ins></strong></font></h2>

<font color="#ADF7B6">**With Docker**</font>

1. Install Docker on your machine. (Instructions for installing Docker can be found [here](https://docs.docker.com/engine/install/)).
2. Create a .env file in the backend folder. (For instructions on how to do this, see the "Without Docker" section below.)
3. Navigate to the front-end folder: `cd front-end` and run `npm i ` or `yarn`
4. From the root directory of the project, run the command `docker-compose up`.

<font color="#ADF7B6"> **Without Docker**</font>

You can also set up the project without using Docker. There are two options for installing the required packages: using `npm` or `yarn`.

<font color="#FFEE93"><ins>_Setup with npm_</ins></font>

<font color="#59A96A"><strong>**Front-End**</strong></font>

1. Navigate to the <font color="#51A3A3"><ins>front-end</ins></font> folder: `cd front-end`
2. Install the required packages: `npm install`
3. Start the front-end server: `npm start`

<font color="#59A96A"><strong>**Back-End(server)**</strong></font>

1. Create an <font color="#51A3A3">.env</font> file in the <font color="#51A3A3">server</font> folder. (For instructions on how to do this, see the next section.)

2. Install the required packages: `npm install`

3. Start the front-end server: `npm start`

<font color="#FFEE93"><ins>_Setup with yarn_</ins></font>

<font color="#59A96A"><strong>**Front-End**</strong></font>

1. Navigate to the <font color="#51A3A3"><ins>front-end</ins></font> folder: `cd front-end`
2. Install the required packages: `yarn`
3. Start the front-end server: `yarn start`

<font color="#59A96A"><strong>**Back-End(server)**</strong></font>

1. Create an <font color="#51A3A3">.env</font> file in the <font color="#51A3A3">server</font> folder. (For instructions on how to do this, see the next section.)

2. Install the required packages: `yarn`

3. Start the front-end server: `yarn start`

<h3><font color="#92D1C3"><strong><ins>Creating the .env File</ins></strong></font></h3>

In order to run the server, you need to create a <font color="#51A3A3">.env</font> file in the <font color="#51A3A3">server</font> folder. To create the file, open a terminal or command prompt and enter the following command:

- #### For Windows `echo > .env`

- #### For Mac/Linux `touch .env`

Next, open the .env file in a text editor and add the following variables:

- `PORT`: The port number for the server (e.g., <font color="#c3e991">3000</font>).
- `MONGO_CONN`: The connection string for your MongoDB database (e.g., <font color="#c3e991">mongodb+srv://<username>:<password>@cluster0.jnw32.mongodb.net/<Database Name>?retryWrites=true&w=majority</font>).
- `JWT_KEY`: A signature key for JSON web tokens (e.g., <font color="#c3e991">my_secret_key</font>). You can generate a random 256-bit key using a tool like [keygen.io](https://keygen.io).
- `JWT_EXPIRES_IN`: Timing for the the JWT token that will expire (e.g., <font color="#c3e991">3h or 30s</font>).
- `TEACHER_EMAIL`: Email address of the teacher that will be used to identify them and grant them administrative privileges(e.g., <font color="#c3e991">['teacher@info.com']</font>).

Alternatively, you can check the <font color="#51A3A3">.env_sample</font>, copy all, then change the needed fields.

<h2><font color="#92D1C3">📝 Note:</font></h2>

If this is the first time running the app, make sure to create an empty folder named <font color="#51A3A3">uploads</font> in the <font color="#51A3A3">server</font> directory. This folder will be used to save any uploaded images.

---

To generate a signature key for your JSON web tokens, you can use a tool like [keygen.io](https://keygen.io) or [randomkeygen.com](https://randomkeygen.com). These websites allow you to generate a random 256-bit key, which can be used as the `JWT_KEY` in your `.env` file.

---

## Libraries Used:

- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
- [Tabler Icons for React](https://tabler-icons-react.vercel.app/)
- [react-easy-crop](https://www.npmjs.com/package/react-easy-crop?activeTab=readme)
