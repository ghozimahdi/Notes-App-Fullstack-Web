import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";
import {Result} from "../model/result";

@injectable()
export class CreateNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  async execute(newNote: Omit<NoteModel, 'id'>): Promise<boolean> {
    return this.noteRepository.createNote(newNote);
  }
}