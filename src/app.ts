import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import projectRoutes from "./routes/projectRoutes";
import interactionLogRoutes from "./routes/interactionLogRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";

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
app.use("/api/interactionLogs", interactionLogRoutes);
app.use("/api/reminders", reminderRoutes);

app.use(notFound);
app.use(errorHandler);

// Example route (you can remove this later)
app.get("/", (_req, res) => {
  res.send("Mini-CRM Backend Running 🚀");
});
