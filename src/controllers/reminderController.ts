import { Request, Response } from "express";
import * as reminderService from "../services/reminderService";
import Reminder, { IReminder } from "../models/Reminder";

// Create a new reminder
export const createReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, dueDate, client, project, interactionType, notes } =
      req.body;

    // Validate required fields
    if (
      !title ||
      !dueDate ||
      !client ||
      !project ||
      !interactionType ||
      !notes
    ) {
      res.status(400).json({ error: "All fields are required" });
      return; // Ensure we stop execution here
    }

    const reminderData: IReminder = new Reminder({
      user: req.user.id,
      title,
      dueDate,
      client,
      project,
      interactionType,
      notes,
    });

    const newReminder = await reminderService.createReminder(reminderData);

    res.status(201).json(newReminder);
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ error: "Server error creating reminder" });
  }
};

// Get all reminders for the authenticated user
export const getReminders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reminders = await reminderService.getAllReminders(req.user.id);
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ error: "Server error fetching reminders" });
  }
};

// Update a reminder
export const updateReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reminderId } = req.params;
    const { title, dueDate, client, project, interactionType, notes } =
      req.body;

    // Validate required fields for update
    if (
      !title ||
      !dueDate ||
      !client ||
      !project ||
      !interactionType ||
      !notes
    ) {
      res.status(400).json({ error: "All fields are required for update" });
      return; // Ensure we stop execution here
    }

    const updatedReminder = await reminderService.updateReminder(reminderId, {
      title,
      dueDate,
      client,
      project,
      interactionType,
      notes,
    });

    if (!updatedReminder) {
      res.status(404).json({ error: "Reminder not found" });
      return; // Ensure we stop execution here
    }

    res.status(200).json(updatedReminder);
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({ error: "Server error updating reminder" });
  }
};

// Delete a reminder
export const deleteReminder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reminderId } = req.params;

    const deletedReminder = await reminderService.deleteReminder(reminderId);

    if (!deletedReminder) {
      res.status(404).json({ error: "Reminder not found" });
      return; // Ensure we stop execution here
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ error: "Server error deleting reminder" });
  }
};
