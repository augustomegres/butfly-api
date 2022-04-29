import { authenticationRoutes } from "@src/http/routes/authentication.routes";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { company } from "./company.routes";

const appRoutes = Router();

appRoutes.use("/", authenticationRoutes);
appRoutes.use(authMiddleware);
appRoutes.use(company);

export { appRoutes };
