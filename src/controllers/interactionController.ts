import { Request, Response } from "express";
import * as interactionLogService from "../services/interactionLogService";

// Create a new interaction log
export const createInteractionLog = async (req: Request, res: Response) => {
  try {
    // Destructure the required fields from the request body
    const { date, interactionType, notes } = req.body;

    // Pass the required data to the service
    const newLog = await interactionLogService.createInteractionLog({
      user: req.user.id, // Assuming the user ID is added to the request after JWT verification
      date,
      interactionType,
      notes,
    });

    // Return the newly created interaction log
    res.json(newLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating interaction log" });
  }
};

// Get all interaction logs for a user
export const getInteractionLogs = async (req: Request, res: Response) => {
  try {
    // Fetch the logs for the authenticated user using their ID (from the JWT)
    const logs = await interactionLogService.getAllInteractionLogs(req.user.id);

    // Return the list of logs
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching interaction logs" });
  }
};

// Update an interaction log
export const updateInteractionLog = async (req: Request, res: Response) => {
  try {
    // Extract the interaction log ID from the URL parameters
    const { interactionLogId } = req.params;

    // Destructure the updated data from the request body
    const { date, interactionType, notes } = req.body;

    // Call the service to update the log
    const updatedLog = await interactionLogService.updateInteractionLog(
      interactionLogId,
      {
        date,
        interactionType,
        notes,
      }
    );

    // If the log wasn't found, return a 404 error
    if (!updatedLog)
      res.status(404).json({ error: "Interaction Log not found" });
    return;

    // Return the updated log
    res.json(updatedLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error updating interaction log" });
  }
};

// Delete an interaction log
export const deleteInteractionLog = async (req: Request, res: Response) => {
  try {
    // Extract the interaction log ID from the URL parameters
    const { interactionLogId } = req.params;

    // Call the service to delete the log
    const deletedLog =
      await interactionLogService.deleteInteractionLog(interactionLogId);

    // If the log wasn't found, return a 404 error
    if (!deletedLog)
      res.status(404).json({ error: "Interaction Log not found" });
    return;

    // Return a success message upon deletion
    res.json({ message: "Interaction Log deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting interaction log" });
  }
};
