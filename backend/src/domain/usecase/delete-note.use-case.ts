import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";

@injectable()
export class DeleteNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.noteRepository.deleteNote(id);
  }
}
