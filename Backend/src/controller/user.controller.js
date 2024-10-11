import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

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
      userName: newUser.userName,
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
    return res.status(201).json({
      message: "user logged in successfully",
      token: token,
      userId: user._id,
      userName: user.userName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//fetching all registered users from db
export const fetchUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("_id");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { userId, image } = req.body;
  console.log(userId);
  console.log(image);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePic = image;
    await user.save();

    return res.status(201).json({ message: "stored image in db successfully" });
  } catch (error) {
    return res.status(500).json({ message: "unable to store image" });
  }
};
