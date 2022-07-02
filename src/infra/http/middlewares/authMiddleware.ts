import { AppError } from "@infra/shared/errors/AppError"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

const secret = process.env.JWT_SECRET as string

interface TokenPayload {
  uid: string
}

export class AuthMiddleware {
  async handle(request: Request, _: Response, next: NextFunction): Promise<void> {
    const { authorization } = request.headers

    if (!authorization) throw new AppError("Missing authorization header", 401)

    const [, token] = authorization.split(" ")
    try {
      const payload = verify(token, secret) as TokenPayload
      const user = payload
      request.user = user
    } catch (error) {
      throw new AppError("Invalid token", 401)
    }

    return next()
  }
}
