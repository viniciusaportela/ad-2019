import axios from "axios";
import { API_SERVER } from "../constants";

export default class PersonService {
  static async list() {
    const res = await axios.get<Person[]>(`${API_SERVER}/v1/people/`);
    return res.data;
  }

  static async create(name: string, email: string) {
    const res = await axios.post<Person>(`${API_SERVER}/v1/people/`, {
      name,
      email,
    });
    return res.data;
  }

  static async update(personId: string, name: string, email: string) {
    await axios.put<Person>(`${API_SERVER}/v1/people/${personId}`, {
      name,
      email,
    });
  }

  static async delete(personId: string) {
    await axios.delete(`${API_SERVER}/v1/people/${personId}`);
  }

  static async sendToAll() {
    await axios.post(`${API_SERVER}/v1/people/send-to-all`);
  }
}
