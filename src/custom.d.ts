import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can specify a more specific type for `user`, depending on your application's needs.
    }
  }
}
