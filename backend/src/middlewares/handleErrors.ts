import { Request, Response, NextFunction } from "express";

export default async function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json({
    error: err.errorCode || "internal_error",
    code: err.statusCode || 500,
    field: err.field,
    desc: err.description,
  });
}
