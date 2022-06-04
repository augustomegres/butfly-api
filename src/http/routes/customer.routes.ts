import { ValidateParamMiddleware } from "@http/middlewares/validateParamMiddleware";
import { companyMiddleware, createCustomerController, getCustomersController } from "@infra/main";
import { Router } from "express";
const validateParam = new ValidateParamMiddleware()

const customer = Router();

customer.get(
  "/companies/:companyUid/customers",
  async (req, res, next) => await validateParam.handle(req, res, next),
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await getCustomersController.handle(req, res)
)

customer.post(
  "/companies/:companyUid/customers",
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await createCustomerController.handle(req, res)
);

export { customer };
