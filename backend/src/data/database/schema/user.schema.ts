import {Schema} from "mongoose";
import bcrypt from "bcrypt";
import {UserData} from "../../model/user.data";

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: String,
    required: [true, "Created At is required"],
  },
  address: {
    type: String,
    default: "",
    required: false,
  },
  role: {
    type: Number,
    default: 0,
    required: false,
  },
});

UserSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<UserData | boolean> {
  const user = await this.findOne({email});
  if (!user) {
    return false;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : false;
};