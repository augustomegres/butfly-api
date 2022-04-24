import { Router } from "express";
import { createUserController } from "@src/infra/main";

const userRoutes = Router();

userRoutes.post("/signup", async (req, res) => {
  await createUserController.handle(req, res);
});

export { userRoutes };
