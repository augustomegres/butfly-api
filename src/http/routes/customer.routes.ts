import { companyMiddleware, createCustomerController } from "@infra/main";
import { Router } from "express";

const customer = Router();

customer.post(
  "/company/:companyUid/customers",
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await createCustomerController.handle(req, res)
);

export { customer };
