import { Router } from "express";
import {
  authenticateUserController,
  createUserController,
} from "@src/infra/main";

const authenticationRoutes = Router();

authenticationRoutes.post("/signup", async (req, res) => {
  await createUserController.handle(req, res);
});

authenticationRoutes.post("/signin", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

export { authenticationRoutes };
