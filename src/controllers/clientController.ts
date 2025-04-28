import { Request, Response } from "express";
import Client from "../models/Client";

// Create a new client
export const createClient = async (req: Request, res: Response) => {
  const { name, email, phone, company, notes } = req.body;
  try {
    const newClient = new Client({
      name,
      email,
      phone,
      company,
      notes,
      userId: req.user,
    });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Error creating client" });
  }
};

// Get all clients
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({ userId: req.user });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients" });
  }
};

// Update a client
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, company, notes } = req.body;
  try {
    const updatedClient = await Client.findOneAndUpdate(
      { _id: id, userId: req.user },
      { name, email, phone, company, notes },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Error updating client" });
  }
};

// Delete a client
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.findOneAndDelete({
      _id: id,
      userId: req.user,
    });
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client" });
  }
};
