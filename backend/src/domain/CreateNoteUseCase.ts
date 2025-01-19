import NoteRepository from "./repository/NoteRepository";
import {Note} from "./model/Note";
import NoteRepositoryImpl from "../data/respository/NoteRepositoryImpl";

class CreateNoteUseCase {
    constructor(private noteRepository: NoteRepository) {
    }

    execute(newNote: Omit<Note, 'id'>): Note {
        return this.noteRepository.createNote(newNote);
    }
}

export default new CreateNoteUseCase(NoteRepositoryImpl);