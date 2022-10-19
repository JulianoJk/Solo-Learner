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
    var decoded: IUser = jwt_decode(parameters.token);

    const currentUser: IUser = await User.findById(decoded.id);
    console.log(currentUser);

    // let isExpiredToken: boolean = false;

    // var dateNow = new Date();
    // if (decoded.exp < dateNow.getTime()) {
    //   isExpiredToken = true;
    // }

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
    // cehck
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
    if (checkIfTeacher) {
      jwt.sign(
        { id: user._id },
        process.env.JWT_KEY,
        {
          expiresIn: "120s"
        },
        (err: string, token: string) => {
          if (err) throw err;
          res.json({
            token,
            username: user.username,
            id: user._id,
            isTeacher: true,
          });
        }
      );
    }
    //Assign the token to the user
    jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      (err: string, token: string) => {
        if (err) throw err;
        res.json({
          token,
          username: user.username,
          id: user._id,
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

    const payload = {
      user: {
        id: userSignup._id,
      },
    };

    //Assign the token to the user
    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT_KEY
    // res.json({
    //   token,
    //   username: userSignup.username,
    //   id: userSignup._id,
    //   dateJointed: dateJointed,
    //   isTeacher: false,
    // });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

router.delete("/deleteAccount/:id", async (req: Request, res: Response) => {
  try {
    // Get the email and password for auth
    const { email, password } = req.body;
    // get id from url to delete account
    const { id } = req.params;

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

    User.deleteOne({ _id: id }, function (err: any, docs: any) {
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
