import NoteDataSource from '../datasource/note.datasource';
import {NoteModel} from '../../domain/model/note.model';
import {noteMapper} from '../mapper/note.mapper';
import {NoteRepository} from "../../domain/repository/note.repository";
import {inject, injectable} from "inversify";
import NoteDatasource from "../datasource/note.datasource";
import {Result} from "../../domain/model/result";
import {handleError} from "../../domain/model/exception";
import {UpdateNoteInput} from "../../domain/model/update-note.input";

@injectable()
class NoteRepositoryImpl implements NoteRepository {
  constructor(
    @inject(NoteDatasource) private noteDataSource: NoteDataSource
  ) {}

  async getAllNotes(): Promise<Result<NoteModel[]>> {
    try {
      const notesData = await this.noteDataSource.getAllNotes();
      const notes: NoteModel[] = notesData.map(noteMapper.mapFromData);
      return {data: notes, success: true};
    } catch (e) {
      handleError("Failed to fetch notes", e)
    }
  }

  async getNoteById(id: number): Promise<Result<NoteModel>> {
    try {
      const noteData = this.noteDataSource.getNoteById(id);
      const note = noteMapper.mapFromData(noteData);
      return {
        data: note,
        success: true,
      };
    } catch (e) {
      handleError("Failed to fetch a note", e);
    }
  }

  async createNote(newNote: Omit<NoteModel, 'id'>): Promise<Result<NoteModel>> {
    try {
      const noteData = noteMapper.mapFromDomain({...newNote, id: 0});
      const createdNoteData = this.noteDataSource.createNote(noteData);
      const note = noteMapper.mapFromData(createdNoteData);
      return {
        success: true,
        data: note,
      };
    } catch (e) {
      handleError("Failed to create a note", e);
    }
  }

  async updateNote(input: UpdateNoteInput): Promise<Result<NoteModel>> {
    try {
      const noteData = noteMapper.mapFromDomain(input);
      const updatedNoteData = await this.noteDataSource.updateNote(noteData);
      const note = noteMapper.mapFromData(updatedNoteData);
      return {
        success: true,
        message: 'Success update note',
        data: note,
      };
    } catch (e) {
      handleError('Failed to update noted, please try again!', e);
    }
  }

  async deleteNote(id: number): Promise<Result<boolean>> {
    try {
      this.noteDataSource.deleteNote(id);
      return {success: true, message: "Successfully delete noted"};
    } catch (e) {
      handleError("Failed to delete noted, please try again!", e);
    }
  }
}

export default NoteRepositoryImpl;