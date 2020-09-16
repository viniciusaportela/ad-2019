import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { ValidationError } from "../constants/Errors";

/**
 * Check if the validator founds any invalid input. If found any
 * error on inputs pass a **ValidationError** to next middleware
 */
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
