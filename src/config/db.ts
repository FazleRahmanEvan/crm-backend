// backend/src/config/db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {});
    console.log("🚀 MongoDB connected!");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};
