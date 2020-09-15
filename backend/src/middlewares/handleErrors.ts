import { Request, Response, NextFunction } from "express";
import { HttpError } from "../constants/Errors";

export default async function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.code || 500).json(
    err instanceof HttpError
      ? {
          error: err.errorCode,
          code: err.code,
          description: err.description,
        }
      : { error: "internal_error" }
  );
}
