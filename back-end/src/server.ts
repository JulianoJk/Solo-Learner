const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fileupload = require("express-fileupload");

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

mongoose.connect("mongodb://root:root@mongodb:27017", () =>
  console.log("DB connected")
);
console.log(mongoose.connection.readyState);

app.use("/users", require("./controllers/users"));
