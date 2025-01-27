import {Schema} from "mongoose";

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: String,
    required: [true, 'Created At is required'],
  },
  address: {
    type: String,
    default: '',
    required: false,
  },
  role: {
    type: Number,
    default: 0,
    require: false,
  },
});