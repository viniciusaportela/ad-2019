import nodemailer from "nodemailer";
import config from "../config";

/**
 * @class
 * Mailer Service
 */
export default class MailService {
  /**
   * Send emails to certain persons with certain subjects and content
   *
   * @param emailForms List of email requests
   */
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
