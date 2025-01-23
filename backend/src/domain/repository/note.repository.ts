import {NoteModel} from "../model/note.model";
import {UpdateNoteInput} from "../model/update-note.input";

const NoteRepositoryDI = {
  Name: Symbol.for('NoteRepository'),
};

interface NoteRepository {
  getAllNotes(): Promise<NoteModel[]>;

  getNoteById(id: string): Promise<NoteModel>;

  createNote(input: UpdateNoteInput): Promise<NoteModel>;

  updateNote(input: UpdateNoteInput): Promise<NoteModel>;

  deleteNote(id: string): Promise<boolean>;
}

export {NoteRepository, NoteRepositoryDI}