import NoteRepository from "../repository/note.repository";

export class DeleteNoteUseCase {
  constructor(private repository: NoteRepository) {}

  execute(id: number): boolean {
    return this.repository.deleteNote(id);
  }
}
