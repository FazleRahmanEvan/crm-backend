import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Get the user data using userId (from JWT token)
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch total clients
    const totalClients = await User.countDocuments({ userId: req.user });

    // Fetch total projects
    const totalProjects = await Project.countDocuments({ userId: req.user });

    // Fetch reminders (optional)
    const remindersDue = 5; // Just an example, you can fetch from a reminders model

    // Projects by status (example)
    const projectsByStatus = {
      active: 10, // Replace with actual data
      completed: 5,
    };

    res.json({
      totalClients,
      totalProjects,
      remindersDue,
      projectsByStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
