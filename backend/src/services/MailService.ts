import nodemailer from "nodemailer";
import config from "../config";

export default class MailService {
  static async send(emailForms: EmailForm[]) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.gmailUsername,
        pass: config.gmailPassword,
      },
    });

    await Promise.all(
      emailForms.map(async (form) => {
        const options = {
          from: "Amigo Secreto",
          to: form.to,
          subject: form.subject,
          text: form.text,
        };

        await transporter.sendMail(options);
      })
    );
  }
}
