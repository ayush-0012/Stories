import express from "express";
import { connectDB } from "./src/database/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./src/routes/auth.route.js";
import bodyParser from "body-parser";
import { postRoutes } from "./src/routes/post.route.js";
import { userRoutes } from "./src/routes/user.route.js";
import { commentRoutes } from "./src/routes/comment.route.js";
import { createServer } from "http";
import { Server } from "socket.io";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
};

dotenv.config({
  path: "./.env",
});

const app = express();
connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`new ${userId} joined their personal room`);
  });

  socket.on("send-notification", (data) => {
    io.to(data.recipeintId).emit("new-notification", {
      type: data.type,
      message: data.message,
      sender: data.sender,
    });
  });

  socket.on("disconnet", (socket) => {
    console.log("client disconnected", socket.id);
  });
});

// app.get("/home", (req, res) => {
//   res.send("hello ");
// });

app.use((req, res, next) => {
  req.io = io;
  next();
});
//using middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// console.log(process.env.PORT);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, (err) => {
  console.log(`Server is running`);

  if (err) {
    console.log(err);
  }
});

export { io };
