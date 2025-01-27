import mongoose from "mongoose";
import {injectable} from "inversify";
import {NoteData} from "../model/note.data";
import {NoteSchema} from "./schema/note.schema";
import {UserSchema} from "./schema/user.schema";
import {UserData} from "../model/user.data";
import {appConfig} from "../../env";

@injectable()
export class AppDatabase {
  async connect() {
    try {
      await mongoose.connect(appConfig.mongodbUri);
      console.log('MongoDB connected successfully!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    }
  }

  noteDao() {
    return mongoose.model<NoteData>('Note', NoteSchema);
  }

  userDao() {
    return mongoose.model<UserData>('User', UserSchema);
  }
}
