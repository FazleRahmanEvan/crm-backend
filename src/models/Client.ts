import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

const clientSchema = new Schema<IClient>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: String,
  notes: String,
});

const Client = mongoose.model<IClient>("Client", clientSchema);

export default Client;
