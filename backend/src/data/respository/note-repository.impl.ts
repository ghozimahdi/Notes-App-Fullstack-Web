import NoteDataSource from '../datasource/note.datasource';
import NoteDatasource from '../datasource/note.datasource';
import {NoteModel} from '../../domain/model/note.model';
import {noteMapper} from '../mapper/note.mapper';
import {NoteRepository} from "../../domain/repository/note.repository";
import {inject, injectable} from "inversify";
import {UpdateNoteInput} from "../../domain/model/update-note.input";
import {safeCall} from "../safe.call";

@injectable()
class NoteRepositoryImpl implements NoteRepository {
  constructor(
    @inject(NoteDatasource) private noteDataSource: NoteDataSource
  ) {}

  @safeCall()
  async getAllNotes(): Promise<NoteModel[]> {
    const notesData = await this.noteDataSource.getAllNotes();
    return notesData.map(noteMapper.mapFromData);
  }

  @safeCall()
  async getNoteById(id: string): Promise<NoteModel> {
    const noteData = await this.noteDataSource.getNoteById(id);
    return noteMapper.mapFromData(noteData);
  }

  @safeCall()
  async createNote(input: UpdateNoteInput): Promise<NoteModel> {
    const noteData = noteMapper.mapFromDomain(input);
    const result = await this.noteDataSource.createNote(noteData);
    return noteMapper.mapFromData(result);
  }

  @safeCall()
  async updateNote(input: UpdateNoteInput): Promise<NoteModel> {
    const noteData = noteMapper.mapFromDomain(input);
    const result = await this.noteDataSource.updateNote(noteData);
    return noteMapper.mapFromData(result);
  }

  @safeCall()
  async deleteNote(id: string): Promise<boolean> {
    return this.noteDataSource.deleteNote(id);
  }
}

export default NoteRepositoryImpl;