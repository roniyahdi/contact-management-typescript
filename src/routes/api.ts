import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { contactIdMiddleware } from "../middleware/contact-id-middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User API
apiRouter.get("/users/current", UserController.get);
apiRouter.patch("/users/current", UserController.update);
apiRouter.delete("/users/current", UserController.logout);

// Contact API
apiRouter.post("/contacts", ContactController.create);
apiRouter.get("/contacts/:contactId", contactIdMiddleware, ContactController.get);
apiRouter.put("/contacts/:contactId", contactIdMiddleware, ContactController.update);
apiRouter.delete("/contacts/:contactId", contactIdMiddleware, ContactController.delete);
apiRouter.get("/contacts", ContactController.search);
