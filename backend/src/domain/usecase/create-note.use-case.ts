import {NoteRepository, NoteRepositoryDI} from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import {inject, injectable} from "inversify";

@injectable()
export class CreateNoteUseCase {
  constructor(
    @inject(NoteRepositoryDI.Name) private noteRepository: NoteRepository
  ) {}

  execute(newNote: Omit<NoteModel, 'id'>): NoteModel {
    return this.noteRepository.createNote(newNote);
  }
}