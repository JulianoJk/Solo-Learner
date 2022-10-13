import mongoose from "mongoose";
const userModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  username: { type: String },
  dateJoined: { type: Date },
});
let User = mongoose.model("users", userModel);
module.exports = User;
