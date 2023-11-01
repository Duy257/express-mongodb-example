import { Router } from "express";
import userController from "../controller/user-controller";

export const userRoute = Router();

// userRoute.use(authAdmin)
userRoute.get("", userController.getAll);
userRoute.put("/:id", userController.updateUser);
