import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {UpdateNoteInput} from "../model/update-note.input";

@injectable()
export class CreateNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(input: UpdateNoteInput): Promise<NoteModel> {
    return this.noteRepository.createNote(input);
  }
}