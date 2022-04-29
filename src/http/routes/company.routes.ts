import { Router } from "express";
import { createCompanyController } from "@src/infra/main";

const company = Router();

company.post("/company", async (req, res) => {
  await createCompanyController.handle(req, res);
});

export { company };
