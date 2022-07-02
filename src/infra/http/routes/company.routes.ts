import { Request, Response, Router } from "express"
import { createCompanyController, getUserCompaniesController } from "@src/infra/main"

const company = Router()

company.get("/companies", async (req: Request, res: Response) => {
  await getUserCompaniesController.handle(req, res)
})

company.post("/companies", async (req: Request, res: Response) => {
  await createCompanyController.handle(req, res)
})

export { company }
