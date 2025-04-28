import mongoose, { Document, Schema } from "mongoose";

export interface IInteractionLog extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  interactionType: "call" | "meeting" | "email";
  notes?: string;
}

const interactionLogSchema = new Schema<IInteractionLog>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    interactionType: {
      type: String,
      required: true,
      enum: ["call", "meeting", "email"],
    },
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const InteractionLog = mongoose.model<IInteractionLog>(
  "InteractionLog",
  interactionLogSchema
);

export { InteractionLog };

//
