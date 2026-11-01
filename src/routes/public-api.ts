import express from "express";
import { TestWebController } from "../controller/test-web";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router();

// test apk first
publicRouter.get("/test", TestWebController.testWeb);

// users
publicRouter.post("/users", UserController.register);
publicRouter.post("/users/login", UserController.login);
