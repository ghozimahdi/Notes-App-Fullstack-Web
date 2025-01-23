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

  async createNote(newNote: NoteData): Promise<NoteData | null> {
    try {
      return await this.appDb.noteDao().create(newNote);
    } catch (e) {
      throw e;
    }
  }

  async updateNote(noteData: NoteData): Promise<NoteData | null> {
    try {
      // const noteIndex = this.appDb.findIndex((note) => note.id === noteData.id);
      // if (noteIndex === -1) {
      //   return null;
      // }
      //
      // const newNote = {
      //   ...noteData,
      //   createdAt: new Date().toISOString(),
      // }
      //
      // const updated = {...this.notes[noteIndex], ...newNote};
      // this.notes[noteIndex] = updated;
      return null;
    } catch (e) {
      throw e;
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      // const noteIndex = this.notes.findIndex((note) => note.id === id);
      // if (noteIndex === -1) {
      //   return false;
      // }
      //
      // this.notes.splice(noteIndex, 1);
      return Promise.resolve(true);
    } catch (e) {
      throw e;
    }
  }
}

export default NoteDatasource;