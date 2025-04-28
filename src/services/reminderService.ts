/* eslint-disable @typescript-eslint/no-unused-vars */
import Reminder, { IReminder } from "../models/Reminder";

// Create a new reminder
export const createReminder = async (reminderData: IReminder) => {
  try {
    // Create a new Reminder instance using the model
    const newReminder = new Reminder(reminderData);

    // Save the new reminder
    await newReminder.save();

    return newReminder;
  } catch (error) {
    throw new Error("Error creating reminder");
  }
};

// Get all reminders for a specific user
export const getAllReminders = async (userId: string) => {
  try {
    const reminders = await Reminder.find({ user: userId });
    return reminders;
  } catch (error) {
    throw new Error("Error fetching reminders");
  }
};

// Update a reminder
export const updateReminder = async (
  reminderId: string,
  updateData: Partial<IReminder>
) => {
  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      updateData,
      { new: true }
    );
    return updatedReminder;
  } catch (error) {
    throw new Error("Error updating reminder");
  }
};

// Delete a reminder
export const deleteReminder = async (reminderId: string) => {
  try {
    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);
    return deletedReminder;
  } catch (error) {
    throw new Error("Error deleting reminder");
  }
};
