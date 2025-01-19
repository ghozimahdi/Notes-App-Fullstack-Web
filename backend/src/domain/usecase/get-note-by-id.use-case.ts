import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";

@injectable()
export class GetNoteByIdUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  execute(id: number): NoteModel | undefined {
    return this.noteRepository.getNoteById(id);
  }
}