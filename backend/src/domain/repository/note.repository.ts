import {NoteModel} from "../model/note.model";

export default interface NoteRepository {
    getAllNotes(): NoteModel[];

    getNoteById(id: number): NoteModel | undefined;

    createNote(newNote: Omit<NoteModel, 'id'>): NoteModel;

    updateNote(id: number, updatedNote: Partial<Omit<NoteModel, 'id'>>): NoteModel | undefined;

    deleteNote(id: number): boolean;
}