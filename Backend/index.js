import express from "express";
import { connectDB } from "./src/database/database.js";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./env",
});
connectDB();

app.get("/home", (req, res) => {
  res.send("hello ");
});

app.listen(4000, (err) => {
  console.log("server is running");

  if (err) {
    console.log(err);
  }
});
