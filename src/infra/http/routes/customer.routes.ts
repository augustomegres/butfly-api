import { ValidateParamMiddleware } from "@infra/http/middlewares/validateParamMiddleware";
import { companyMiddleware, createCustomerController, createCustomerEmailController, getCustomerController, getCustomersController } from "@infra/main";
import { Router } from "express";
const validateParam = new ValidateParamMiddleware()

const customer = Router();

customer.get(
  "/companies/:companyUid/customers/:customerUid",
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await getCustomerController.handle(req, res)
)

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

customer.post('/companies/:companyUid/customers/:customerUid/emails',
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await createCustomerEmailController.handle(req, res)
)

export { customer };
