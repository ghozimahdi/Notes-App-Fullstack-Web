import mongoose from "mongoose";
import {injectable} from "inversify";
import {NoteData} from "../model/note.data";
import {NoteSchema} from "./schema/note.schema";
import {UserData} from "../model/user.data";
import {appConfig} from "../../config/env";
import UserSchema from "./schema/user.schema";

@injectable()
export class MongoDatabase {
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
    return mongoose.model<UserData>('User', UserSchema.index(
      {email: 1},
      {unique: true}
    ));
  }
}
