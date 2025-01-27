import {Container} from 'inversify';
import NoteDatasource from "./data/datasource/note.datasource";
import {NoteRepository, NoteRepositoryDI} from "./domain/repository/note.repository";
import NoteRepositoryImpl from "./data/respository/note-repository.impl";
import {CreateNoteUseCase} from "./domain/usecase/create-note.use-case";
import {DeleteNoteUseCase} from "./domain/usecase/delete-note.use-case";
import {GetAllNotesUseCase} from "./domain/usecase/get-all-notes.use-case";
import {GetNoteByIdUseCase} from "./domain/usecase/get-note-by-id.use-case";
import {UpdateNoteUseCase} from "./domain/usecase/update-note.use-case";
import {NoteController} from "./presentation/note/controller/note.controller";
import {AppDatabase} from "./data/database/app.database";
import {UserRepository, UserRepositoryDI} from "./domain/repository/user.repository";
import {UserRepositoryImpl} from "./data/respository/user-repository.impl";
import {GetUserByIdUseCase} from "./domain/usecase/get-user-by-id.use-case";
import {CreateUserUseCase} from "./domain/usecase/create-user.use-case";
import {UserController} from "./presentation/user/controller/user.controller";
import {UserDatasource} from "./data/datasource/user.datasource";
import {LoginUseCase} from "./domain/usecase/login.use-case";
import {AuthDatasource} from "./data/datasource/auth.datasource";
import {AuthRepository, AuthRepositoryDI} from "./domain/repository/auth.repository";
import {AuthRepositoryImpl} from "./data/respository/auth.repository.impl";
import {AuthController} from "./presentation/auth/controller/auth.controller";
import {SessionManager} from "./data/session.manager";

const container = new Container();

container.bind(AppDatabase).toSelf();
container.bind(SessionManager).toSelf();

container.bind(NoteDatasource).toSelf();
container.bind(UserDatasource).toSelf();
container.bind(AuthDatasource).toSelf();

container.bind<NoteRepository>(NoteRepositoryDI.Name).to(NoteRepositoryImpl);
container.bind<UserRepository>(UserRepositoryDI.Name).to(UserRepositoryImpl);
container.bind<AuthRepository>(AuthRepositoryDI.Name).to(AuthRepositoryImpl);

container.bind(CreateNoteUseCase).toSelf();
container.bind(DeleteNoteUseCase).toSelf();
container.bind(GetAllNotesUseCase).toSelf();
container.bind(GetNoteByIdUseCase).toSelf();
container.bind(UpdateNoteUseCase).toSelf();
container.bind(GetUserByIdUseCase).toSelf();
container.bind(CreateUserUseCase).toSelf();
container.bind(LoginUseCase).toSelf();

container.bind(NoteController).toSelf();
container.bind(UserController).toSelf();
container.bind(AuthController).toSelf();

export {container};