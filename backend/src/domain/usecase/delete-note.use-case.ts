import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {Result} from "../model/result";

@injectable()
export class DeleteNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(id: number): Promise<Result<boolean>> {
    return this.noteRepository.deleteNote(id);
  }
}
