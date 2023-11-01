import { Router } from "express";
import userController from "../controller/user-controller";

export const userRoute = Router();

userRoute.get("/:id", userController.fetch);
