import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {inject, injectable} from "inversify";
import {Result} from "../model/result";
import {NoteModel} from "../model/note.model";

@injectable()
export class GetAllNotesUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(): Promise<NoteModel[]> {
    return this.noteRepository.getAllNotes();
  }
}
