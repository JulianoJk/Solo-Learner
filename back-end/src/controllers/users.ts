const router = require("express").Router();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt_decode from "jwt-decode";
interface DecodeToken {
  email: string;
  id?: string;
  password: string;
  username: string;
  dateJoined: Date;
  __v?: number | string;
}
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.get("/profile/:AccessToken", async (req: Request, res: Response) => {
  const { AccessToken } = req.params;
  const decoded: DecodeToken = jwt_decode(AccessToken);
  const currentUser = await User.findById(decoded?.id);
  res.json(currentUser);

  // if (AccessToken !== "" || AccessToken !== null || AccessToken !== undefined) {
  //   // const user = await User.find({ AccessToken: AccessToken });
  //   // res.json({ dateJoined: user.dateJoined });
  //   const tokenData = jwt.verify(AccessToken, process.env.JWT_KEY);
  //   console.log(tokenData);

  //   return res.json("Hi");
  // } else {
  //   res.status(203).json("null");
  // }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Mandatory fields are missing" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
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
    return res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    let { email, password, passwordRepeat, username } = req.body;
    // Validations
    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!email || !password || !passwordRepeat) {
      return res.status(400).json({ message: "Mandatory fields are missing" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password needs at least 5 characters" });
    }
    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Check if email already exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
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
    });

    const userSignup = await newUser.save();

    const payload = {
      user: {
        id: userSignup._id,
      },
    };

    //Assign the token to the user
    const token = jwt.sign(payload, process.env.JWT_KEY);
    res.json({
      token,
      username: userSignup.username,
      id: userSignup._id,
      dateJointed: dateJointed,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;

router.delete("/deleteAccount", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      const errorEmail = "User not found";
      res.status(404).json({ errorEmail });
      // stop further execution in this callback
      return;
    } else {
      const foundEmail = "User found!";

      await User.findOneAndDelete({ email: email }, function (err: any) {
        res.status(200).json({ foundEmail });
      });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});
