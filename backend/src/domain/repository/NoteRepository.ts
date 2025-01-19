import {Note} from '../model/Note';

export default interface NoteRepository {
    getAllNotes(): Note[];

    getNoteById(id: number): Note | undefined;

    createNote(newNote: Omit<Note, 'id'>): Note;

    updateNote(id: number, updatedNote: Partial<Omit<Note, 'id'>>): Note | undefined;

    deleteNote(id: number): boolean;
}