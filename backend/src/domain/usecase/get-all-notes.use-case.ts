import NoteRepository from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import NoteRepositoryImpl from "../../data/respository/note-repository.impl";

export class GetAllNotesUseCase {
  constructor(private noteRepository: NoteRepository) {
  }

  execute(): NoteModel[] {
    return this.noteRepository.getAllNotes();
  }
}
