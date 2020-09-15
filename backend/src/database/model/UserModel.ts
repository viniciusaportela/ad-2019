import { Schema } from "mongoose";

const UserModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

export default UserModel;
