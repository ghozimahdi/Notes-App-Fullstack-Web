import NoteRepository from '../../domain/repository/NoteRepository';
import NoteDataSource from '../datasource/NoteDataSource';
import {Note} from '../../domain/model/Note';
import {NoteMapper} from '../mapper/NoteMapper';

class NoteRepositoryImpl implements NoteRepository {
    getAllNotes(): Note[] {
        const notesData = NoteDataSource.getAllNotes();
        return notesData.map(NoteMapper.mapFromData);
    }

    getNoteById(id: number): Note | undefined {
        const noteData = NoteDataSource.getNoteById(id);
        return noteData ? NoteMapper.mapFromData(noteData) : undefined;
    }

    createNote(newNote: Omit<Note, 'id'>): Note {
        const noteData = NoteMapper.mapFromDomain({...newNote, id: 0});
        const createdNoteData = NoteDataSource.createNote(noteData);
        return NoteMapper.mapFromData(createdNoteData);
    }

    updateNote(id: number, updatedNote: Partial<Omit<Note, 'id'>>): Note | undefined {
        const noteData = NoteMapper.mapFromDomain({...updatedNote, id} as Note);
        const updatedNoteData = NoteDataSource.updateNote(id, noteData);
        return updatedNoteData ? NoteMapper.mapFromData(updatedNoteData) : undefined;
    }

    deleteNote(id: number): boolean {
        return NoteDataSource.deleteNote(id);
    }
}

export default new NoteRepositoryImpl();