const router = require("express").Router();
import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
const checkIfTokenExpired = require("../utils/utils");
const path = require("path");
const fs = require("fs");

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

let currentUser: IUser;

router.get("/profile/:token", async (req: Request, res: Response) => {
  try {
    const parameters = req.params;

    let decoded: IUser = jwt_decode(parameters.token);

    currentUser = await User.findById(decoded.id);

    if (checkIfTokenExpired(decoded.exp)) {
      res.json("Expired session, please login again!");
    } else {
      res.json(currentUser.dateJoined.toDateString());
    }
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
      return res.status(400).json({ message: "No account found!" });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const checkIfTeacher = process.env.TEACHER_EMAIL.includes(email);

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    let { email, password, passwordRepeat, username } = req.body;
    console.log("REQUESTED");

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

    // Check if username is taken
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken." });
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteAccount/:token", async (req: Request, res: Response) => {
  try {
    const parameters = req.params;

    let decoded: IUser = jwt_decode(parameters.token);

    currentUser = await User.findById(decoded.id);

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
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (checkIfTokenExpired(decoded.exp)) {
      res.json("Expired session, please login again!");
    } else {
      User.deleteOne({ _id: currentUser.id }, function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          res.status(202).json("We're sorry to see you go :(. ");
          console.log("We're sorry to see you go :(.");
        }
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
// Save image from FE
router.post("/profile-image/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    console.log(id);

    if (id === "undefined" || id === "") {
      res.send({
        status: "failed",
        message: "No user found",
      });
    } else if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      console.log(req.params);

      file.mv("./uploads/" + `${id}.png`);

      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          name: `${id}.png`,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// Send image
router.get("/profileImage/:id", async (req: any, res: any) => {
  const { id } = req.params;

  const uploaded = path.resolve(__dirname, `../../uploads`);
  const image = path.resolve(__dirname, `../../uploads/${id}.png`);

  try {
    // Check if folder is empty
    fs.readdir(uploaded, function (err: any, files: any) {
      if (err) {
        res.json(null);
        return;
      } else {
        if (fs.existsSync(image)) {
          res.status(200).sendFile(image);
        } else {
          res.json(null);
        }
      }
    });

    return;
  } catch (error) {
    console.log(error);
  }
});

// Test
router.delete("/testme/:token", async (req: Request, res: Response) => {
  try {
    const parameters = req.params;

    let decoded: IUser = jwt_decode(parameters.token);

    currentUser = await User.findById(decoded.id);

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
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (checkIfTokenExpired(decoded.exp)) {
      res.json("Expired session, please login again!");
    } else {
      User.findOne({ _id: currentUser.id }, function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          res.status(202).json("Done!!");
        }
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
module.exports = router;
