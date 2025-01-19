import NoteDatasource from "../data/datasource/note.datasource";
import NoteRepositoryImpl from "../data/respository/note-repository.impl";
import NoteRepository from "../domain/repository/note.repository";
import {NoteController} from "../presentation/controllers/note.controller";
import {CreateNoteUseCase} from "../domain/usecase/create-note.use-case";
import {DeleteNoteUseCase} from "../domain/usecase/delete-note.use-case";
import {GetAllNotesUseCase} from "../domain/usecase/get-all-notes.use-case";
import {GetNoteByIdUseCase} from "../domain/usecase/get-note-by-id.use-case";
import {UpdateNoteUseCase} from "../domain/usecase/update-note.use-case";

function bindMethods(controller: any) {
  const prototype = Object.getPrototypeOf(controller);
  Object.getOwnPropertyNames(prototype).forEach((methodName) => {
    const method = prototype[methodName];
    if (typeof method === 'function') {
      controller[methodName] = method.bind(controller);
    }
  });
}

const noteDataSource = new NoteDatasource();

const noteRepository: NoteRepository = new NoteRepositoryImpl(noteDataSource);

const createNoteUseCase = new CreateNoteUseCase(noteRepository);
const deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
const getAllNotesUseCase = new GetAllNotesUseCase(noteRepository);
const getNoteByIdUseCase = new GetNoteByIdUseCase(noteRepository);
const updateNoteUseCase = new UpdateNoteUseCase(noteRepository);

const noteController = new NoteController({
  getAllNotesUseCase: getAllNotesUseCase,
  getNoteByIdUseCase: getNoteByIdUseCase,
  createNoteUseCase: createNoteUseCase,
  updateNoteUseCase: updateNoteUseCase,
  deleteNoteUseCase: deleteNoteUseCase,
});

bindMethods(noteController);

export {noteController}
