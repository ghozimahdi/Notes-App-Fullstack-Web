import NoteDataSource from '../datasource/note.datasource';
import NoteDatasource from '../datasource/note.datasource';
import {NoteModel} from '../../domain/model/note.model';
import {noteMapper} from '../mapper/note.mapper';
import {NoteRepository} from "../../domain/repository/note.repository";
import {inject, injectable} from "inversify";
import {UpdateNoteInput} from "../../domain/model/update-note.input";

@injectable()
class NoteRepositoryImpl implements NoteRepository {
  constructor(
    @inject(NoteDatasource) private noteDataSource: NoteDataSource
  ) {}

  async getAllNotes(): Promise<NoteModel[]> {
    try {
      const notesData = await this.noteDataSource.getAllNotes();
      return notesData.map(noteMapper.mapFromData);
    } catch (e) {
      throw e;
    }
  }

  async getNoteById(id: number): Promise<NoteModel> {
    try {
      const noteData = await this.noteDataSource.getNoteById(id);
      return noteMapper.mapFromData(noteData);
    } catch (e) {
      throw e;
    }
  }

  async createNote(newNote: Omit<NoteModel, 'id'>): Promise<boolean> {
    try {
      return true;
    } catch (e) {
      throw e;
    }
  }

  async updateNote(input: UpdateNoteInput): Promise<NoteModel> {
    try {
      const noteData = noteMapper.mapFromDomain(input);
      return noteMapper.mapFromData(null);
    } catch (e) {
      throw e;
    }
  }

  async deleteNote(id: number): Promise<boolean> {
    try {
      this.noteDataSource.deleteNote(id);
      return true;
    } catch (e) {
      throw e;
    }
  }
}

export default NoteRepositoryImpl;