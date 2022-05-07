import { companyMiddleware, createProductController } from "@infra/main";
import { Router } from "express";

const product = Router();

product.post(
  "/company/:companyUid/products",
  async (req, res, next) => await companyMiddleware.handle(req, res, next),
  async (req, res) => await createProductController.handle(req, res)
);

export { product };
