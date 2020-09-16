import axios from "axios";
import { API_SERVER } from "../constants";

/**
 * @class
 * Manipulates the actions with Person entity
 */
export default class PersonService {
  /**
   * Get a list of all registered people
   */
  static async list() {
    const res = await axios.get<Person[]>(`${API_SERVER}/v1/people/`);
    return res.data;
  }

  /**
   * Register a new person to database
   *
   * @param name Name of users
   * @param email Email of user
   *
   * @returns The inserted person
   */
  static async create(name: string, email: string): Promise<Person>;
  static async create(...args: string[]): Promise<Person>;
  static async create(name: string, email: string) {
    const res = await axios.post<Person>(`${API_SERVER}/v1/people/`, {
      name,
      email,
    });
    return res.data;
  }

  /**
   * Updates a certain person
   *
   * @param personId The person ID to edit
   * @param name New name of person
   * @param email New email of person
   */
  static async update(
    personId: string,
    name: string,
    email: string
  ): Promise<void>;
  static async update(...args: string[]): Promise<void>;
  static async update(personId: string, name: string, email: string) {
    await axios.put<Person>(`${API_SERVER}/v1/people/${personId}`, {
      name,
      email,
    });
  }

  /**
   * Deletes a certain person from database
   *
   * @param personId The person ID to edit
   */
  static async delete(personId: string) {
    await axios.delete(`${API_SERVER}/v1/people/${personId}`);
  }

  /**
   * Send a email with his secret friend to all registered people, also delete
   * the registered people in database after successfully sent all emails
   */
  static async sendToAll() {
    await axios.post(`${API_SERVER}/v1/people/send-to-all`);
  }
}
