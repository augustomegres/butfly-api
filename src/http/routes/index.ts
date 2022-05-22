import { authenticationRoutes } from "@src/http/routes/authentication.routes";
import { Router } from "express";
import { authMiddleware } from "@infra/main";
import { company } from "./company.routes";
import { customer } from "./customer.routes";
import { product } from "./product.routes";
import { user } from "./user.routes";

const appRoutes = Router();

appRoutes.use(authenticationRoutes);
appRoutes.use(authMiddleware.handle);
appRoutes.use(user);
appRoutes.use(company);
appRoutes.use(customer);
appRoutes.use(product);

export { appRoutes };
