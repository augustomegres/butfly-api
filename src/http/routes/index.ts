import { authenticationRoutes } from "@src/http/routes/authentication.routes";
import { Router } from "express";
import { authMiddleware } from "@http/middlewares/authMiddleware";
import { company } from "./company.routes";
import { customer } from "./customer.routes";

const appRoutes = Router();

appRoutes.use("/", authenticationRoutes);
appRoutes.use(authMiddleware);
appRoutes.use(company);
appRoutes.use(customer);

export { appRoutes };
