import { Request, Response, Router } from "express";
import { createCompanyController } from "@src/infra/main";

const company = Router();

company.post("/companies", async (req: Request, res: Response) => {
  await createCompanyController.handle(req, res);
});

export { company };
