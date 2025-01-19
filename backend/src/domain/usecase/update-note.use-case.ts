import NoteRepository from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import NoteRepositoryImpl from "../../data/respository/note-repository.impl";

export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {
  }

  execute(id: number, updatedNote: Partial<Omit<NoteModel, 'id'>>): NoteModel | undefined {
    return this.noteRepository.updateNote(id, updatedNote);
  }
}