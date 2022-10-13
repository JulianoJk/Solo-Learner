const router = require("express").Router();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

router.get("/profile", async (req: Request, res: Response) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send("Not authenticated");
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_KEY);
    return res.status(200).send(tokenData);
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
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
    const dateJointed = new Date();
    console.log(dateJointed);

    const newUser = new User({
      email: email,
      password: passwordHashed,
      username: username,
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
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
