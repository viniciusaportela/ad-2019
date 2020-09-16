import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

export default {
  /**
   * MongoDB Host
   */
  mongoHost: process.env.MONGO_HOST,

  /**
   * MongoDB Username
   */
  mongoUser: process.env.MONGO_USER,

  /**
   * MongoDB Password
   */
  mongoPassword: process.env.MONGO_PASSWORD,

  /**
   * MongoDB Database
   */
  mongoDatabase: process.env.MONGO_DATABASE,

  /**
   * Gmail email
   */
  gmailUsername: process.env.GMAIL_USERNAME,

  /**
   * Gmail password
   */
  gmailPassword: process.env.GMAIL_PASSWORD,

  /**
   * MainGun Private Api Key
   */
  mailgunApiKey: process.env.MAILGUN_API_KEY,

  /**
   * MainGun Domain
   */
  mailgunDomain: process.env.MAILGUN_DOMAIN,

  /**
   * MainGun Private Api Key
   */
  mailgunSenderEmail: process.env.MAILGUN_SENDER_EMAIL,

  /**
   * Api port to listen
   */
  port: process.env.PORT || 8080,
};
