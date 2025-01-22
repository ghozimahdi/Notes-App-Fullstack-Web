import {NoteModel} from "../model/note.model";
import {UpdateNoteInput} from "../model/update-note.input";

const NoteRepositoryDI = {
  Name: Symbol.for('NoteRepository'),
};

interface NoteRepository {
  getAllNotes(): Promise<NoteModel[]>;

  getNoteById(id: number): Promise<NoteModel>;

  createNote(newNote: Omit<NoteModel, 'id'>): Promise<NoteModel>;

  updateNote(input: UpdateNoteInput): Promise<NoteModel>;

  deleteNote(id: number): Promise<boolean>;
}

export {NoteRepository, NoteRepositoryDI}