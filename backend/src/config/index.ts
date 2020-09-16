import dotenv from "dotenv";

dotenv.config();

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
   * Api port to listen
   */
  port: process.env.PORT || 8080,
};
