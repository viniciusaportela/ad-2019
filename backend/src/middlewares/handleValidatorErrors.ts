import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { ValidationError } from "../constants/Errors";

export default function handleValidatorErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const currentError = errors.array({ onlyFirstError: true })[0];
    next(new ValidationError(currentError.msg, currentError.param));
  } else {
    next();
  }
}
