// backend/src/routes/authRoutes.ts

import express from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  await signup(req, res);
});

// Login Route
router.post("/login", async (req, res) => {
  await login(req, res);
});

export default router;
