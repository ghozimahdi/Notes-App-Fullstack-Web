interface Note {
    id: number;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
}

class NoteDataSource {
    private notes: Note[] = [
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

    getAllNotes(): Note[] {
        return this.notes;
    }

    getNoteById(id: number): Note | undefined {
        return this.notes.find((note) => note.id === id);
    }

    createNote(newNote: Omit<Note, 'id'>): Note {
        const newId = this.notes.length + 1;
        const createdNote = {id: newId, ...newNote};
        this.notes.push(createdNote);
        return createdNote;
    }

    updateNote(id: number, updatedNote: Partial<Omit<Note, 'id'>>): Note | undefined {
        const noteIndex = this.notes.findIndex((note) => note.id === id);
        if (noteIndex === -1) return undefined;

        const updated = {...this.notes[noteIndex], ...updatedNote};
        this.notes[noteIndex] = updated;
        return updated;
    }

    deleteNote(id: number): boolean {
        const noteIndex = this.notes.findIndex((note) => note.id === id);
        if (noteIndex === -1) return false;

        this.notes.splice(noteIndex, 1);
        return true;
    }
}

export default new NoteDataSource();