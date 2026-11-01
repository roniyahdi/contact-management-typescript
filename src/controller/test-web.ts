import { NextFunction, Request, Response } from "express";

export class TestWebController {
  static testWeb(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).send("Web is running successfully");
    } catch (error) {
        next(error);
    }
  }
}
