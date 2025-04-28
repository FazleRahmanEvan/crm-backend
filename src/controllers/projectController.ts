import { Request, Response } from "express";
import Project from "../models/Project";

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { title, budget, deadline, status, clientId } = req.body;
  try {
    const newProject = new Project({
      title,
      budget,
      deadline,
      status,
      clientId,
      userId: req.user,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// Get all projects for a user
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ userId: req.user });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, budget, deadline, status, clientId } = req.body;
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, userId: req.user },
      { title, budget, deadline, status, clientId },
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      userId: req.user,
    });
    if (!deletedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
