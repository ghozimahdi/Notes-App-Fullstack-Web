import NoteDataSource from '../datasource/NoteDataSource';

class NoteRepository {
    getAllNotes() {
        return NoteDataSource.getAllNotes();
    }

    getNoteById(id: number) {
        return NoteDataSource.getNoteById(id);
    }

    createNote(newNote: { title: string; body: string; createdAt: string; archived: boolean }) {
        return NoteDataSource.createNote(newNote);
    }

    updateNote(id: number, updatedNote: Partial<{ title: string; body: string; archived: boolean }>) {
        return NoteDataSource.updateNote(id, updatedNote);
    }

    deleteNote(id: number) {
        return NoteDataSource.deleteNote(id);
    }
}

export default new NoteRepository();