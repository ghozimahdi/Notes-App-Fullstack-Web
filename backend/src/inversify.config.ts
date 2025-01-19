import {Container} from 'inversify';
import NoteDatasource from "./data/datasource/note.datasource";
import {NoteRepository, NoteRepositoryDI} from "./domain/repository/note.repository";
import NoteRepositoryImpl from "./data/respository/note-repository.impl";
import {CreateNoteUseCase} from "./domain/usecase/create-note.use-case";
import {DeleteNoteUseCase} from "./domain/usecase/delete-note.use-case";
import {GetAllNotesUseCase} from "./domain/usecase/get-all-notes.use-case";
import {GetNoteByIdUseCase} from "./domain/usecase/get-note-by-id.use-case";
import {UpdateNoteUseCase} from "./domain/usecase/update-note.use-case";
import {NoteController} from "./presentation/controllers/note.controller";

const container = new Container();

container.bind(NoteDatasource);
container.bind<NoteRepository>(NoteRepositoryDI.Name).to(NoteRepositoryImpl);

container.bind(CreateNoteUseCase);
container.bind(DeleteNoteUseCase);
container.bind(GetAllNotesUseCase);
container.bind(GetNoteByIdUseCase);
container.bind(UpdateNoteUseCase);

container.bind(NoteController).toSelf();

export {container};