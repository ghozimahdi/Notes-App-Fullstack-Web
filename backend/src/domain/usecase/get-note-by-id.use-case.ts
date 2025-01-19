import NoteRepository from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import NoteRepositoryImpl from "../../data/respository/note-repository.impl";

export class GetNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {
  }

  execute(id: number): NoteModel | undefined {
    return this.noteRepository.getNoteById(id);
  }
}