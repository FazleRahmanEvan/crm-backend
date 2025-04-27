import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  user: mongoose.Schema.Types.ObjectId;
  client: mongoose.Schema.Types.ObjectId;
  title: string;
  budget: number;
  deadline: Date;
  status: string;
}

const projectSchema = new Schema<IProject>({
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
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
