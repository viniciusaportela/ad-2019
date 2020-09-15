import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import { ErrorCodes } from "../constants/Errors";
import UserService from "../services/PersonService";

export default class PersonController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const people = await UserService.list();
      res.json(people);
    } catch (e) {
      next(e);
    }
  }

  static insertValidator = [
    body("name")
      .exists()
      .withMessage(ErrorCodes.MISSING_FIELD)
      .isString()
      .withMessage(ErrorCodes.SHOULD_BE_STRING),
    body("email")
      .exists()
      .withMessage(ErrorCodes.MISSING_FIELD)
      .isString()
      .withMessage(ErrorCodes.SHOULD_BE_STRING)
      .isEmail()
      .withMessage(ErrorCodes.INVALID_EMAIL),
  ];

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;

    try {
      const inserted = await UserService.create(name, email);
      res.status(201).json(inserted);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;
    const { person } = req.params;

    try {
      await UserService.update(person, name, email);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { person } = req.params;

    try {
      await UserService.delete(person);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
