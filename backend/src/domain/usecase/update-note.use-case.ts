import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {Result} from "../model/result";
import {UpdateNoteInput} from "../model/update-note.input";

@injectable()
export class UpdateNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(input: UpdateNoteInput): Promise<Result<NoteModel>> {
    return this.noteRepository.updateNote(input);
  }
}