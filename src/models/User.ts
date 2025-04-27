// backend/src/models/User.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  themePreference: "light" | "dark";
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    themePreference: { type: String, default: "light" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
