import NoteDataSource from '../datasource/note.datasource';
import {NoteModel} from '../../domain/model/note.model';
import {noteMapper} from '../mapper/note.mapper';
import {NoteRepository} from "../../domain/repository/note.repository";
import {inject, injectable} from "inversify";
import NoteDatasource from "../datasource/note.datasource";

@injectable()
class NoteRepositoryImpl implements NoteRepository {
  constructor(
    @inject(NoteDatasource) private noteDataSource: NoteDataSource
  ) {}

  getAllNotes(): NoteModel[] {
    const notesData = this.noteDataSource.getAllNotes();
    return notesData.map(noteMapper.mapFromData);
  }

  getNoteById(id: number): NoteModel | undefined {
    const noteData = this.noteDataSource.getNoteById(id);
    return noteData ? noteMapper.mapFromData(noteData) : undefined;
  }

  createNote(newNote: Omit<NoteModel, 'id'>): NoteModel {
    const noteData = noteMapper.mapFromDomain({...newNote, id: 0});
    const createdNoteData = this.noteDataSource.createNote(noteData);
    return noteMapper.mapFromData(createdNoteData);
  }

  updateNote(id: number, updatedNote: Partial<Omit<NoteModel, 'id'>>): NoteModel | undefined {
    const noteData = noteMapper.mapFromDomain({...updatedNote, id} as NoteModel);
    const updatedNoteData = this.noteDataSource.updateNote(id, noteData);
    return updatedNoteData ? noteMapper.mapFromData(updatedNoteData) : undefined;
  }

  deleteNote(id: number): boolean {
    return this.noteDataSource.deleteNote(id);
  }
}

export default NoteRepositoryImpl;