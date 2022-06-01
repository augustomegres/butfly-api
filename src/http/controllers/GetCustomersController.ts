import { GetCustomersUseCase } from "@app/useCases/GetCustomers";
import { QueryParams } from "@http/services/queryParam";
import { SortParam } from "@http/services/sortParam";
import { IncludeParam } from "@http/services/includeParam";
import { Request, Response } from "express";

export class GetCustomersController {
  constructor(private getCustomersUseCase: GetCustomersUseCase) { }

  async handle(req: Request, res: Response) {
    const queryParamParser = new QueryParams()
    const sortParamParser = new SortParam()
    const includeParamParser = new IncludeParam()

    const { page = 1, perPage = 25, query, include: includeParam, sortBy } = req.query

    const params = queryParamParser.handle(query as string, ["name", "surname"])
    const sort = sortParamParser.handle(sortBy as string, ["name", "surname"])
    const include = includeParamParser.handle(includeParam as string, ["phones", "emails", "addresses"]) as "phones" | "emails" | "addresses"[]

    const customers = await this.getCustomersUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
      include,
      filter: params,
      sortBy: sort
    })
    return res.status(200).json(customers)
  }
}