import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {Result} from "../model/result";

@injectable()
export class GetNoteByIdUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(id: number): Promise<NoteModel> {
    return this.noteRepository.getNoteById(id);
  }
}