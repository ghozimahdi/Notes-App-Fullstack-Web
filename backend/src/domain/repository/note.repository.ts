import {NoteModel} from "../model/note.model";

const NoteRepositoryDI = {
  Name: Symbol.for('NoteRepository'),
};

interface NoteRepository {
  getAllNotes(): NoteModel[];

  getNoteById(id: number): NoteModel | undefined;

  createNote(newNote: Omit<NoteModel, 'id'>): NoteModel;

  updateNote(id: number, updatedNote: Partial<Omit<NoteModel, 'id'>>): NoteModel | undefined;

  deleteNote(id: number): boolean;
}

export {NoteRepository, NoteRepositoryDI}