import { createCustomerController } from "@infra/main";
import { Router } from "express";

const customer = Router();

customer.post("/company/:companyUid/customers", async (req, res) => {
  await createCustomerController.handle(req, res);
});

export { customer };
