import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpError, ValidationError } from "../constants/Errors";

/**
 * Handle all errors from previous middlewares / routes
 *
 * returns a json response with the following format:
 * ```typescript
 * {
 *  error: ErrorCodes,
 *  code: number,
 *  description?: string
 *  field?: string
 * }
 * ```
 */
export default async function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  res.status(err.statusCode || 500).json(
    err instanceof HttpError
      ? {
          error: err.errorCode || "internal_error",
          code: err.statusCode || 500,
          field: err instanceof ValidationError ? err.field : undefined,
          desc: err.description,
        }
      : { error: ErrorCodes.INTERNAL_ERROR, code: 500 }
  );
}
