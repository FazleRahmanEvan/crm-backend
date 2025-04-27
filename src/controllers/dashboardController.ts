import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export const getDashboardData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user;
    if (!userId) {
      res.status(400).json({ message: "User ID not found in the request" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const totalClients = await User.countDocuments({ userId: userId });

    const totalProjects = await Project.countDocuments({ userId: userId });

    const remindersDue = 5;

    const projectsByStatus = {
      active: 10,
      completed: 5,
    };

    // Send the response
    res.json({
      totalClients,
      totalProjects,
      remindersDue,
      projectsByStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
