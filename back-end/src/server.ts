const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fileupload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    createParentPath: true,
  })
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));

mongoose.connect(process.env.MONGO_CONN, () => console.log('DB connected'));

app.use('/users', require('./controllers/users'));
