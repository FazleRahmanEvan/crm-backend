/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
