import mongoose from "mongoose";
import {injectable} from "inversify";
import {NoteData} from "../model/note.data";
import {NoteSchema} from "./schema/note.schema";

@injectable()
export class AppDatabase {
  async connect() {
    try {
      await mongoose.connect('mongodb://localhost/note_db');
      console.log('MongoDB connected successfully!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    }
  }

  noteDao() {
    return mongoose.model<NoteData>('Note', NoteSchema);
  }
}
