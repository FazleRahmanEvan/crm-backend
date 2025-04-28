// routes/interactionLogRoutes.ts
import express from "express";
import {
  createInteractionLog,
  getInteractionLogs,
  updateInteractionLog,
  deleteInteractionLog,
} from "../controllers/interactionController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Get all interaction logs for the authenticated user
router.route("/").get(protect, getInteractionLogs);

// Create a new interaction log
router.route("/").post(protect, createInteractionLog);

// Update an existing interaction log by ID
router.route("/:interactionLogId").put(protect, updateInteractionLog);

// Delete an interaction log by ID
router.route("/:interactionLogId").delete(protect, deleteInteractionLog);

export default router;
