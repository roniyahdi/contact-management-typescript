import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../model/user-request";

export async function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.get("Authorization");

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
}
