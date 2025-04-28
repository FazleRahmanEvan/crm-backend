import mongoose from "mongoose";

const InteractionLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    date: { type: Date, required: true },
    interactionType: {
      type: String,
      enum: ["call", "meeting", "email"],
      required: true,
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const InteractionLog = mongoose.model(
  "InteractionLog",
  InteractionLogSchema
);
