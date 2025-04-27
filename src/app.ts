import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

dotenv.config();

connectDB();

export const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Example route (you can remove this later)
app.get("/", (_req, res) => {
  res.send("Mini-CRM Backend Running 🚀");
});
