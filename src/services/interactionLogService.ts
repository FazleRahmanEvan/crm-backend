import { IInteractionLog, InteractionLog } from "../models/InteractionLog";

// Create a new interaction log

export const createInteractionLog = async (
  data: Partial<IInteractionLog>
): Promise<IInteractionLog> => {
  // Type assertion here to assert that the object will match the IInteractionLog schema after save
  const newLog = new InteractionLog(data as IInteractionLog);
  return await newLog.save();
};

// Get all interaction logs for a user
export const getAllInteractionLogs = async (
  userId: string
): Promise<IInteractionLog[]> => {
  return await InteractionLog.find({ user: userId });
};

// Update an interaction log
export const updateInteractionLog = async (
  interactionLogId: string,
  data: Partial<IInteractionLog>
): Promise<IInteractionLog | null> => {
  return await InteractionLog.findByIdAndUpdate(interactionLogId, data, {
    new: true,
  });
};

// Delete an interaction log
export const deleteInteractionLog = async (
  interactionLogId: string
): Promise<IInteractionLog | null> => {
  return await InteractionLog.findByIdAndDelete(interactionLogId);
};
