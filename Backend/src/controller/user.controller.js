import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;
console.log("jwt :", JWT_SECRET);

//registering a user and storing info in db
export const registerUser = async (req, res) => {
  console.log("Received signup request", req.body);
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    console.log(existingUser);
    console.log(newUser, newUser._id);

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "user created successfully",
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//checking the credentials while logging in
export const authenticatingUser = async (req, res) => {
  console.log("Received login request", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log(JWT_SECRET);
    return res
      .status(200)
      .json({ token, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
