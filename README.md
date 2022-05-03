# General info
MERN stack Duolingo clone! This is a Duolingo clone, which is being developed by 3 BS students, a CS student, English Language & Literature student and a Fine arts student!

## Setup
### Front-End(client)
```
$ cd ../client
$ npm install update
$ npm start
```
### Back-End(server)
```
$ cd ../server
$ npm i mongoose 
$ npm install update
$ node server.js

```
Additionally, in order to run the server, you need to create a .env file in the cmd/powershell or terminal
by typing:
#### For Windows `echo > .env`
#### For Mac/Linux `touch .env`

Now type inside the .env file 
 * The port number as `PORT = {port number}`
 * The link to connect with the MongoDB Atlas as `MONGO_CONN = mongodb+srv://<username>:<password>@cluster0.jnw32.mongodb.net/<Database Name>?retryWrites=true&w=majority`
 * The signature key as `JWT_KEY= <your signature key>`


Or just check the .env_sample, copy all, then change the needed fields

---
**NOTE**

As for the signature key, you can find random signature keys generators online and use the 256-bit key. 
An example is "https://randomkeygen.com/" or "https://keygen.io/" 

---



