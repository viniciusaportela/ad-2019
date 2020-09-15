import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpError, ValidationError } from "../constants/Errors";
export default async function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json(
    err instanceof HttpError
      ? {
          error: err.errorCode || "internal_error",
          code: err.statusCode || 500,
          field: err instanceof ValidationError ? err.field : undefined,
          desc: err.description,
        }
      : { error: ErrorCodes.INTERNAL_ERROR }
  );
}
