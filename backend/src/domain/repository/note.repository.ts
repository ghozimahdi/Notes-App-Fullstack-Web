import {NoteModel} from "../model/note.model";
import {Result} from "../model/result";
import {UpdateNoteInput} from "../model/update-note.input";

const NoteRepositoryDI = {
  Name: Symbol.for('NoteRepository'),
};

interface NoteRepository {
  getAllNotes(): Promise<Result<NoteModel[]>>;

  getNoteById(id: number): Promise<Result<NoteModel>>;

  createNote(newNote: Omit<NoteModel, 'id'>): Promise<Result<NoteModel>>;

  updateNote(input: UpdateNoteInput): Promise<Result<NoteModel>>;

  deleteNote(id: number): Promise<Result<boolean>>;
}

export {NoteRepository, NoteRepositoryDI}