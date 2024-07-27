import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbname: "stories",
    });

    console.log("Connected to database");
  } catch (error) {
    console.log(`unable to connect with database ${error}`);
  }
}
