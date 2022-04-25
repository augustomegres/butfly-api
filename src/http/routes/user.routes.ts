import { Router } from "express";
import {
  authenticateUserController,
  createUserController,
} from "@src/infra/main";

const userRoutes = Router();

userRoutes.post("/signup", async (req, res) => {
  await createUserController.handle(req, res);
});

userRoutes.post("/signin", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

export { userRoutes };
