import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";

@injectable()
export class GetNoteByIdUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(id: number): Promise<NoteModel | undefined> {
    return this.noteRepository.getNoteById(id);
  }
}