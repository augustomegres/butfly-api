import { meController } from "@infra/main";
import { Request, Response, Router } from "express";

const user = Router();

user.get("/me", async (req: Request, res: Response) => {
  await meController.handle(req, res);
});

export { user };
