import NoteRepository from "./repository/NoteRepository";
import {Note} from "./model/Note";
import NoteRepositoryImpl from "../data/respository/NoteRepositoryImpl";

class UpdateNoteUseCase {
    constructor(private noteRepository: NoteRepository) {
    }

    execute(id: number, updatedNote: Partial<Omit<Note, 'id'>>): Note | undefined {
        return this.noteRepository.updateNote(id, updatedNote);
    }
}

export default new UpdateNoteUseCase(NoteRepositoryImpl)