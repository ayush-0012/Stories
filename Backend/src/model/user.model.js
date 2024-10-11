import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
    },
    userName: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      unique: true,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
