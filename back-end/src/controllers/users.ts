const router = require("express").Router();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
interface IUser {
  _id: string;
  email: string;
  password: string;
  username?: string;
  dateJoined?: Date;
  isTeacher?: boolean;
  __v?: number;
}

router.get("/profile/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(id);
    res.json(currentUser.dateJoined.toDateString());
  } catch (error) {
    res.status(404).json("No user found...");
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
      return res.status(400).json({ message: "Account not found." });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    if (email === "niovits@gmail.com") {
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
      isTeacher: false,
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
      isTeacher: false,
    });
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
    // const currentUser = await User.findById(id);

    // const deleted = await User.deleteOne(
    //   { _id: "634c8d9010c98097108c6a0e" },
    //   function (err: any) {
    //     res.status(200).json({ message: "Done!" });
    //   }
    // );
    // const currentUser = await User.findById(id);

    User.findByIdAndDelete({ _id: id }, function (err: any) {
      if (err) {
        return console.error(err);
      } else if (!id) {
        return res.status(404).json({ message: "No user detected." });
      } else {
        return res.status(202).json("Deleted!");
      }
    });

    //   Task.findByIdAndDelete({ _id: id }, function (err) {
    //     if (err) {
    //       return handleError(err);
    //     } else if (!id) {
    //       return res.status(404).json({ message: "No Task id detected." });
    //     } else {
    //       return res.status(202).json("Deleted!");
    //     }
    //   });
    // } catch (e) {
    //   return res.status(400).json({ error: e.message });
    // }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
