import { Request, Response } from "express";
import { InteractionLog } from "../models/InteractionLog";

export const createInteraction = async (req: Request, res: Response) => {
  try {
    const interaction = await InteractionLog.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ error: "Server error creating interaction log" });
  }
};

export const getUserInteractions = async (req: Request, res: Response) => {
  try {
    const interactions = await InteractionLog.find({ userId: req.user._id });
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching interactions" });
  }
};
