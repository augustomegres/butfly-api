import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export class ValidateParamMiddleware {
  validKeys = ['search', 'query', 'page', 'perPage', 'include', 'sortBy']
  async handle(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const queryParams = request.query
    Object.keys(queryParams).forEach(key => {
      if (!this.validKeys.includes(key)) throw new AppError(`Invalid param (${key}), valid params are ${this.validKeys.join(', ')}`)
    })
    next();
  }
}
