import {Schema} from "mongoose";
import {NoteType} from "../../model/note.data";

export const NoteSchema: Schema = new Schema({
  id: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: false,
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
    enum: Object.values(NoteType),
    require: true,
  }
});