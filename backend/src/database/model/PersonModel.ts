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
    friend: {
      type: Schema.Types.ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
);

export interface IPerson extends mongoose.Document {
  name: string;
  email: string;
  friend?: IPerson;
}

export default model<IPerson>("Person", PersonModel);
