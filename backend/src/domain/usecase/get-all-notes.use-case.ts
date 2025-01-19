import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";

@injectable()
export class GetAllNotesUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(): Promise<NoteModel[]> {
    return this.noteRepository.getAllNotes();
  }
}
