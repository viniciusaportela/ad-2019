import nodemailer from "nodemailer";
import Mailgun from "mailgun-js";
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
    if (config.gmailUsername && config.gmailPassword) {
      this._sendWithGmail(emailForms);
    } else if (
      config.mailgunApiKey &&
      config.mailgunDomain &&
      config.mailgunSenderEmail
    ) {
      this._sendWithMailgun(emailForms);
    } else {
      throw new Error("There is not mail credentials configured");
    }
  }

  private static async _sendWithGmail(emailForms: EmailForm[]) {
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

  private static async _sendWithMailgun(emailForms: EmailForm[]) {
    const mailgun = new Mailgun({
      apiKey: config.mailgunApiKey,
      domain: config.mailgunDomain,
    });

    await Promise.all(
      emailForms.map(async (form) => {
        const data = {
          from: "Amigo Secreto <" + config.mailgunSenderEmail + ">",
          to: form.to,
          subject: form.subject,
          html: form.text,
        };

        mailgun.messages().send(data, (err, body) => {
          if (err) {
            console.log(err);
          } else {
            console.log(body);
          }
        });
      })
    );
  }
}
