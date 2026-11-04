import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { routeParamsMiddleware } from "../middleware/route-params-middleware";
import { AddressController } from "../controller/address-controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User API
apiRouter.get("/users/current", UserController.get);
apiRouter.patch("/users/current", UserController.update);
apiRouter.delete("/users/current", UserController.logout);

// Contact API
apiRouter.post("/contacts", ContactController.create);
apiRouter.get("/contacts/:contactId", routeParamsMiddleware, ContactController.get);
apiRouter.put("/contacts/:contactId", routeParamsMiddleware, ContactController.update);
apiRouter.delete("/contacts/:contactId", routeParamsMiddleware, ContactController.delete);
apiRouter.get("/contacts", ContactController.search);

// Address API
apiRouter.post("/contacts/:contactId/addresses", routeParamsMiddleware, AddressController.create);
apiRouter.get("/contacts/:contactId/addresses/:addressId", routeParamsMiddleware, AddressController.get);
apiRouter.put("/contacts/:contactId/addresses/:addressId", routeParamsMiddleware, AddressController.update);
apiRouter.delete("/contacts/:contactId/addresses/:addressId", routeParamsMiddleware, AddressController.remove);
apiRouter.get("/contacts/:contactId/addresses", routeParamsMiddleware, AddressController.list);