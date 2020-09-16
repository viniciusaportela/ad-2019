import nodemailer from "nodemailer";
import config from "../config";

export default class MailService {
  static async sendTo(emails: string[], subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.gmailUsername,
        pass: config.gmailPassword,
      },
    });

    const options = {
      from: config.gmailUsername,
      to: emails,
      subject,
      text,
    };

    await transporter.sendMail(options);
  }
}
