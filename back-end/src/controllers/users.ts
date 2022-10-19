const router = require("express").Router();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
// const checkIfTokenExpired = require("../utils/utils");
const checkIfTokenExpired = require("../utils/utils");
export interface IUser {
  token?: string;
  email?: string;
  password?: string;
  username?: string;
  id?: string;
  dateJoined?: Date;
  isTeacher?: boolean;
  exp?: number;
  iat?: number;
}

router.get("/profile/:token", async (req: Request, res: Response) => {
  try {
    const parameters = req.params;
    let decoded: IUser = jwt_decode(parameters.token);

    const currentUser: IUser = await User.findById(decoded.id);

    // console.log(checkIfTokenExpired(decoded.exp));

    res.json(currentUser.dateJoined.toDateString());
  } catch (error) {
    res.status(404).json("No user found...");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Mandatory fields are missing." });
    }
    const user = await User.findOne({ email: email });
    // if there is no user, inform client
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username or password.." });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }
    const checkIfTeacher = process.env.TEACHER_EMAIL.includes(
      "niovits22@gmail.com"
    );
    //Assign the token to the user
    jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (err: string, token: string) => {
        if (err) throw err;
        res.json({
          token,
          username: user.username,
          id: user._id,
          isTeacher: checkIfTeacher ? true : false,
        });
      }
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    let { email, password, passwordRepeat, username } = req.body;
    // Validations
    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    if (!email || !password || !passwordRepeat) {
      return res.status(400).json({ message: "Mandatory fields are missing." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password needs at least 5 characters." });
    }
    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    // Check if email already exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (!username) {
      username = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    const dateJointed = new Date().toDateString();
    const newUser = new User({
      email: email,
      password: passwordHashed,
      username: username,
      dateJointed: dateJointed,
      isTeacher: false,
    });

    const userSignup = await newUser.save();

    jwt.sign(
      { id: userSignup._id },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (err: string, token: string) => {
        if (err) throw err;
        res.json({
          token,
          username: userSignup.username,
          id: userSignup._id,
          dateJointed: dateJointed,
          isTeacher: false,
        });
      }
    );
    //Assign the token to the user
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

router.delete("/deleteAccount/:token", async (req: Request, res: Response) => {
  try {
    const parameters = req.params;

    let decoded: IUser = jwt_decode(parameters.token);

    const currentUser: IUser = await User.findById(decoded.id);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Mandatory fields are missing." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Account not found." });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }
    User.deleteOne({ _id: currentUser.id }, function (err: any, docs: any) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted : ", docs);
        res.status(202).json("We're sorry to see you go :(. ");
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
