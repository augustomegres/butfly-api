import { AppError } from "@src/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

interface IRequest extends Request {
  user?: { id: string };
}

export async function authMiddleware(
  request: IRequest,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Missing authorization header", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { id } = verify(token, secret) as { id: string };
    const user = { id };
    request.user = user;

    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
