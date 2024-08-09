import express from "express";
import { connectDB } from "./src/database/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./src/routes/user.route.js";
import { createPostRoute } from "./src/routes/createPost.route.js";
import { fetchPost } from "./src/routes/fetchPosts.js";

dotenv.config({
  path: "./.env",
});

const app = express();
connectDB();

app.get("/home", (req, res) => {
  res.send("hello ");
});

//using middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", createPostRoute);
app.use("/fetch", fetchPost);

app.listen(4000, (err) => {
  console.log("server is running");

  if (err) {
    console.log(err);
  }
});
