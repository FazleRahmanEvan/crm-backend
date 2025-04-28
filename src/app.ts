import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

export const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);

// Example route (you can remove this later)
app.get("/", (_req, res) => {
  res.send("Mini-CRM Backend Running 🚀");
});
