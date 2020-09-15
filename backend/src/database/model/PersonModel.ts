import { Schema, model } from "mongoose";

const PersonModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default model("Person", PersonModel);
