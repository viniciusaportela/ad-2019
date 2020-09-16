import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import { ErrorCodes, InvalidUsersLength } from "../constants/Errors";
import MailService from "../services/MailService";
import PersonService from "../services/PersonService";
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

  static async sendToAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.list();

      if (users.length === 0) {
        throw new InvalidUsersLength(
          "There should be at least 2 users registered to start"
        );
      } else if (users.length % 2 !== 0) {
        throw new InvalidUsersLength("The user count must be pair");
      }

      const emailList: EmailForm[] = [];
      while (users.length >= 2) {
        const firstPerson = users[0];

        // Random Second Person
        const maximum = users.length - 1;
        const minimum = 1;

        const secondPersonIndex =
          Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        const secondPerson = users[secondPersonIndex];

        emailList.push({
          to: firstPerson.email,
          subject: "Amigo Secreto",
          text: `Seu amigo secreto é: ${secondPerson.name}`,
        });

        emailList.push({
          to: secondPerson.email,
          subject: "Amigo Secreto",
          text: `Seu amigo secreto é: ${firstPerson.name}`,
        });

        users.splice(secondPersonIndex, 1);
        users.splice(0, 1);
      }

      await MailService.send(emailList);

      await PersonService.deleteAll();

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
