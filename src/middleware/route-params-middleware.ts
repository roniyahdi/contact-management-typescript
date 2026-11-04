import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";

export function routeParamsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { contactId, addressId } = req.params;

  if (contactId !== undefined && (typeof contactId !== "string" || !/^\d+$/.test(contactId))) {
    throw new ResponseError(400, "Contact ID must be a number");
  }

  if (addressId !== undefined && (typeof addressId !== "string" || !/^\d+$/.test(addressId))) {
    throw new ResponseError(400, "Address ID must be a number");
  }

  next();
}
