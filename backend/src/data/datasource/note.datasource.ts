import {NoteData} from "../model/note.data";
import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";

@injectable()
class NoteDatasource {
  constructor(@inject(AppDatabase) private appDb: AppDatabase) {}

  async getAllNotes(): Promise<NoteData[]> {
    return this.appDb.noteDao().find({});
  }

  async getNoteById(id: string): Promise<NoteData | null> {
    const note = await this.appDb.noteDao().findById(id);
    if (!note) {
      return null;
    }

    return note;
  }

  async createNote(newNote: Omit<NoteData, '_id'>): Promise<NoteData | null> {
    const data = {
      ...newNote,
      createdAt: new Date().toISOString(),
    };

    return await this.appDb.noteDao().create(data);
  }

  async updateNote(noteData: NoteData): Promise<NoteData | null> {
    return this.appDb.noteDao().findByIdAndUpdate(
      noteData._id,
      noteData,
      {
        runValidators: true,
        new: true
      }
    );
  }

  async deleteNote(id: string): Promise<boolean> {
    const result = await this.appDb.noteDao().findByIdAndDelete(id)
    return result != null;
  }
}

export default NoteDatasource;