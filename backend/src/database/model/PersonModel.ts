import mongoose, { Schema, model } from "mongoose";

const PersonModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export interface IPerson extends mongoose.Document {
  name: string;
  email: string;
}

export default model<IPerson>("Person", PersonModel);
