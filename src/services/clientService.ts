import Client from "../models/Client";

export const createClient = async (userId: string, clientData: any) => {
  const client = new Client({ user: userId, ...clientData });
  await client.save();
  return client;
};

export const getClients = async (userId: string) => {
  return await Client.find({ user: userId });
};

export const updateClient = async (clientId: string, updatedData: any) => {
  return await Client.findByIdAndUpdate(clientId, updatedData, { new: true });
};

export const deleteClient = async (clientId: string) => {
  return await Client.findByIdAndDelete(clientId);
};
