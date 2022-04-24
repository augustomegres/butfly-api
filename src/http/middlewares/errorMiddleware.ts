import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
const errorMiddleware = async (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Promise<any> => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);
  return response.status(500).json({
    status: "error",
    message: `Internal Server Error`,
  });
};

export { errorMiddleware };
