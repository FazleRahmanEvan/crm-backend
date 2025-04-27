// backend/src/app.ts

import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (_req, res) => {
  res.send("Mini-CRM Backend Running 🚀");
});
