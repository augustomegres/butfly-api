import { authenticationRoutes } from "@src/http/routes/authentication.routes";
import { Router } from "express";
import { authMiddleware } from "@infra/main";
import { company } from "./company.routes";
import { customer } from "./customer.routes";

const appRoutes = Router();

appRoutes.use("/", authenticationRoutes);
appRoutes.use(authMiddleware.handle);
appRoutes.use(company);
appRoutes.use(customer);

export { appRoutes };
