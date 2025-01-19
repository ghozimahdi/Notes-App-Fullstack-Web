import {NoteData} from "../model/NoteData";

class NoteDataSource {
    private notes: NoteData[] = [
        {
            id: 1,
            title: "Babel",
            body: "Babel merupakan tools open-source ...",
            createdAt: '2022-04-14T04:27:34.572Z',
            archived: false,
        },
        {
            id: 2,
            title: "Functional Component",
            body: "Functional component merupakan React component ...",
            createdAt: '2022-04-14T04:27:34.572Z',
            archived: false,
        },
        {
            id: 3,
            title: "Modularization",
            body: "Dalam konteks pemrograman JavaScript ...",
            createdAt: '2022-04-14T04:27:34.572Z',
            archived: false,
        },
    ];

    getAllNotes(): NoteData[] {
        try {
            return this.notes;
        } catch (e) {
            throw e;
        }
    }

    getNoteById(id: number): NoteData | undefined {
        try {
            return this.notes.find((note) => note.id === id);
        } catch (e) {
            throw e;
        }
    }

    createNote(newNote: Omit<NoteData, 'id'>): NoteData {
        try {
            const newId = this.notes.length + 1;
            const createdNote = {id: newId, ...newNote};
            this.notes.push(createdNote);
            return createdNote;
        } catch (e) {
            throw e;
        }
    }

    updateNote(id: number, updatedNote: Partial<Omit<NoteData, 'id'>>): NoteData | undefined {
        try {
            const noteIndex = this.notes.findIndex((note) => note.id === id);
            if (noteIndex === -1) return undefined;

            const updated = {...this.notes[noteIndex], ...updatedNote};
            this.notes[noteIndex] = updated;
            return updated;
        } catch (error) {
            throw error;
        }
    }

    deleteNote(id: number): boolean {
        try {
            const noteIndex = this.notes.findIndex((note) => note.id === id);
            if (noteIndex === -1) return false;

            this.notes.splice(noteIndex, 1);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default new NoteDataSource();