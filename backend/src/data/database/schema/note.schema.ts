import mongoose, {Schema} from "mongoose";
import {NoteTypeEnum} from "../../model/note-type.enum";

export const NoteSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  body: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
  archived: {
    type: Boolean,
    default: false,
    required: false,
  },
  noteType: {
    type: String,
    enum: Object.values(NoteTypeEnum),
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  }
});
