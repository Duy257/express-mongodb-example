import { Router } from "express";
import { AuthRoute } from "./auth-route";
import { userRoute } from "./user-route";
import { auth } from "../middleware/auth";

export const routes = Router();

routes.use("/auth", AuthRoute);
routes.use("/users", auth, userRoute);
