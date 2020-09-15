export default class UserService {
  static async list() {
    try {
      throw "a";

      return [{ id: "asd", name: "a", email: "a" }];
    } catch (e) {
      throw e;
    }
  }

  static async create() {}

  static async update() {}

  static async delete() {}

  static async sendToAll() {}
}
