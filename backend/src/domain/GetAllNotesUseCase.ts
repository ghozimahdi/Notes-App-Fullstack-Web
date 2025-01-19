import NoteRepository from "./repository/NoteRepository";
import {Note} from "./model/Note";
import NoteRepositoryImpl from "../data/respository/NoteRepositoryImpl";

class GetAllNotesUseCase {
    constructor(private noteRepository: NoteRepository) {
    }

    execute(): Note[] {
        return this.noteRepository.getAllNotes();
    }
}

export default new GetAllNotesUseCase(NoteRepositoryImpl);