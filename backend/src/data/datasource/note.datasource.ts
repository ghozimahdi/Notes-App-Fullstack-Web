import {NoteData} from "../model/note.data";
import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";

@injectable()
class NoteDatasource {
  constructor(@inject(AppDatabase) private appDb: AppDatabase) {}

  async getAllNotes(): Promise<NoteData[]> {
    try {
      return await this.appDb.noteDao().find({});
    } catch (e) {
      throw e;
    }
  }

  async getNoteById(id: string): Promise<NoteData | null> {
    try {
      const note = await this.appDb.noteDao().findById(id);
      if (!note) {
        return null;
      }

      return note;
    } catch (e) {
      throw e;
    }
  }

  async createNote(newNote: Omit<NoteData, '_id'>): Promise<NoteData | null> {
    try {
      const data = {
        ...newNote,
        createdAt: new Date().toISOString(),
      };
      return await this.appDb.noteDao().create(data);
    } catch (e) {
      throw e;
    }
  }

  async updateNote(noteData: NoteData): Promise<NoteData | null> {
    try {
      return this.appDb.noteDao().findByIdAndUpdate(
        noteData, {runValidators: true}
      );
    } catch (e) {
      throw e;
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      const result = await this.appDb.noteDao().findByIdAndDelete(id)
      return result != null;
    } catch (e) {
      throw e;
    }
  }
}

export default NoteDatasource;