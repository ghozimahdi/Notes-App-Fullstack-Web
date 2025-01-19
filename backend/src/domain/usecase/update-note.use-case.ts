import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";

@injectable()
export class UpdateNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(id: number, updatedNote: Partial<Omit<NoteModel, 'id'>>): Promise<NoteModel | undefined> {
    return this.noteRepository.updateNote(id, updatedNote);
  }
}