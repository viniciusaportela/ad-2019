import {
  AlreadyExistsError,
  InvalidUsersLength,
  NotFoundError,
} from "../constants/Errors";
import PersonModel from "../database/model/PersonModel";

/**
 * Manipulates the communication to database
 * with the Person Model
 */
export default class PersonService {
  /**
   * Get a list of people registered on database
   */
  static async list() {
    return await PersonModel.find().populate("friend").exec();
  }

  /**
   * Create a new user register on database
   *
   * @param name Person name
   * @param email Person email
   */
  static async create(name: string, email: string) {
    const people = await PersonModel.find({ email });

    if (people.length === 0) {
      const inserted = await PersonModel.create({ name, email });
      return inserted;
    } else {
      throw new AlreadyExistsError();
    }
  }

  /**
   * Updates the data of a certain person on database
   *
   * @param personId Person database ID
   * @param name Person Name
   * @param email Person Email
   */
  static async update(personId: string, name: string, email: string) {
    const alreadyHas = await PersonModel.findOne({ email });

    if (alreadyHas && alreadyHas._id.toString() !== personId) {
      throw new AlreadyExistsError();
    }

    const affected = await PersonModel.updateOne(
      { _id: personId },
      { name, email }
    );

    if (affected.nModified === 0) {
      throw new NotFoundError();
    }
  }

  /**
   * Delete a certain person on database
   *
   * @param personId Person database ID
   */
  static async delete(personId: string) {
    const affected = await PersonModel.deleteOne({ _id: personId });

    if (affected.deletedCount === 0) {
      throw new NotFoundError();
    }
  }

  /**
   * Delete all people registered on database
   */
  static async deleteAll() {
    await PersonModel.deleteMany({});
  }

  /**
   * Creates the friends associations
   *
   * @returns The people list ordered in pairs of people with
   * their secret friend
   */
  static async createFriendRelationsAndReturn() {
    const users = await PersonService.list();

    if (users.length === 0) {
      throw new InvalidUsersLength(
        "There should be at least 2 users registered to start"
      );
    } else if (users.length % 2 !== 0) {
      throw new InvalidUsersLength("The user count must be pair");
    }

    const returnArr = [];

    while (users.length >= 2) {
      const firstPerson = users[0];

      // Random Second Person
      const maximum = users.length - 1;
      const minimum = 1;

      const secondPersonIndex =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const secondPerson = users[secondPersonIndex];

      await PersonModel.updateOne(
        { _id: firstPerson._id },
        { friend: secondPerson }
      );
      await PersonModel.updateOne(
        { _id: secondPerson._id },
        { friend: firstPerson }
      );

      returnArr.push(firstPerson);
      returnArr.push(secondPerson);

      users.splice(secondPersonIndex, 1);
      users.splice(0, 1);
    }

    return returnArr;
  }

  static async createFriendRelations() {
    await PersonService.createFriendRelationsAndReturn();
  }
}
