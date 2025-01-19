import NoteRepository from "../repository/note.repository";
import {NoteModel} from "../model/note.model";
import NoteRepositoryImpl from "../../data/respository/note-repository.impl";

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  execute(newNote: Omit<NoteModel, 'id'>): NoteModel {
    return this.noteRepository.createNote(newNote);
  }
}