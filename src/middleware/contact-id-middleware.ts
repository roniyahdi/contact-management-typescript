import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";

export const contactIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactId = req.params.contactId;

  if (typeof contactId !== "string" || !/^\d+$/.test(contactId)) {
    throw new ResponseError(404, "Contact not found");
  }

  next();
};