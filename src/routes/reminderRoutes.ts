import express from "express";
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getReminders);

router.route("/").post(protect, createReminder);

router.route("/:reminderId").put(protect, updateReminder);

router.route("/:reminderId").delete(protect, deleteReminder);

export default router;
