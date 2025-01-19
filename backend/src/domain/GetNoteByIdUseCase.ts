import NoteRepository from "./repository/NoteRepository";
import {Note} from "./model/Note";
import NoteRepositoryImpl from "../data/respository/NoteRepositoryImpl";

class GetNoteByIdUseCase {
    constructor(private noteRepository: NoteRepository) {
    }

    execute(id: number): Note | undefined {
        return this.noteRepository.getNoteById(id);
    }
}

export default new GetNoteByIdUseCase(NoteRepositoryImpl);