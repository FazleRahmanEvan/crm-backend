import mongoose, { Document, Schema } from "mongoose";

export interface IReminder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  client: mongoose.Schema.Types.ObjectId;
  project: mongoose.Schema.Types.ObjectId;
  dueDate: Date;
  interactionType: string;
  notes: string;
}

const reminderSchema = new Schema<IReminder>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  interactionType: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const Reminder = mongoose.model<IReminder>("Reminder", reminderSchema);

export default Reminder;
