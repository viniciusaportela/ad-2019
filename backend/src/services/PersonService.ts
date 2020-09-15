import PersonModel from "../database/model/PersonModel";

export default class UserService {
  static async create(name: string, email: string) {
    const inserted = await PersonModel.create({ name, email });
    return inserted;
  }

  static async update(userId: number) {}

  static async delete(userId: number) {}
}
