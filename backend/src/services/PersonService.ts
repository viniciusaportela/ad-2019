import { NotFoundError } from "../constants/Errors";
import PersonModel from "../database/model/PersonModel";

export default class PersonService {
  static async create(name: string, email: string) {
    const inserted = await PersonModel.create({ name, email });
    return inserted;
  }

  static async update(personId: string, name: string, email: string) {
    const affected = await PersonModel.updateOne(
      { _id: personId },
      { name, email }
    );

    if (affected.nModified === 0) {
      throw new NotFoundError();
    }
  }

  static async delete(personId: string) {
    const affected = await PersonModel.deleteOne({ _id: personId });

    if (affected.deletedCount === 0) {
      throw new NotFoundError();
    }
  }
}
