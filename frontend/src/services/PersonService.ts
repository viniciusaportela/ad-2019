export default class PersonService {
  static async list() {
    try {
      throw "a";

      return [{ id: "asd", name: "a", email: "a" }];
    } catch (e) {
      throw e;
    }
  }

  static async create(name: string, email: string) {
    try {
      throw "a";

      return { id: "asd", name: "a", email: "a" };
    } catch (e) {
      throw e;
    }
  }

  static async update() {}

  static async delete() {}

  static async sendToAll() {}
}
