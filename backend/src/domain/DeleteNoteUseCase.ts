import NoteRepository from "./repository/NoteRepository";
import NoteRepositoryImpl from "../data/respository/NoteRepositoryImpl";

class DeleteNoteUseCase {
    constructor(private repository: NoteRepository) {
    }

    execute(id: number): boolean {
        return this.repository.deleteNote(id);
    }
}

export default new DeleteNoteUseCase(NoteRepositoryImpl);