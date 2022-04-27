import { authenticationRoutes } from "@src/http/routes/authentication.routes";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const appRoutes = Router();

appRoutes.use("/", authenticationRoutes);

appRoutes.use(authMiddleware);

export { appRoutes };
