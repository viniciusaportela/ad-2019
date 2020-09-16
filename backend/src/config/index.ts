import dotenv from "dotenv";

dotenv.config();

export default {
  mongoHost: process.env.MONGO_HOST,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDatabase: process.env.MONGO_DATABASE,
  gmailUsername: process.env.GMAIL_USERNAME,
  gmailPassword: process.env.GMAIL_PASSWORD,
  port: process.env.PORT || 8080,
};
