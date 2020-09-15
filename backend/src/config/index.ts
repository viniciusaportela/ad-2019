import dotenv from "dotenv";

dotenv.config();

export default {
  mongoHost: process.env.MONGO_HOST,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDatabase: process.env.MONGO_DATABASE,
  port: process.env.PORT || 8080,
};
