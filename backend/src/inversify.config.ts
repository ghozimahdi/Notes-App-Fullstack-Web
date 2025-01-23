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
import {AppDatabase} from "./data/database/app.database";

const container = new Container();

container.bind(AppDatabase).toSelf();
container.bind(NoteDatasource).toSelf();
container.bind<NoteRepository>(NoteRepositoryDI.Name).to(NoteRepositoryImpl);

container.bind(CreateNoteUseCase).toSelf();
container.bind(DeleteNoteUseCase).toSelf();
container.bind(GetAllNotesUseCase).toSelf();
container.bind(GetNoteByIdUseCase).toSelf();
container.bind(UpdateNoteUseCase).toSelf();

container.bind(NoteController).toSelf();

export {container};