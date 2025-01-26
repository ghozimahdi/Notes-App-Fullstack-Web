import mongoose, {Schema} from "mongoose";
import {NoteType} from "../../model/note.data";

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'The username is cannot empty'],
  },
  email: {
    type: String,
    required: [true, 'The email is cannot empty'],
  },
  password: {
    type: String,
    required: [true, 'The password is cannot empty'],
  },
  createdAt: {
    type: String,
    required: true,
  },
  address: {
    type: Boolean,
    default: '',
    required: false,
  },
  role: {
    type: Number,
    default: 0,
    require: false,
  },
});