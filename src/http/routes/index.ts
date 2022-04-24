import { userRoutes } from "@http/routes/user.routes";
import { Router } from "express";

const appRoutes = Router();

appRoutes.use("/", userRoutes);

export { appRoutes };
