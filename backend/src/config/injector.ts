import {Container} from 'inversify';
import NoteDatasource from "../data/datasource/note.datasource";
import {NoteRepository, NoteRepositoryDI} from "../domain/repository/note.repository";
import NoteRepositoryImpl from "../data/respository/note-repository.impl";
import {CreateNoteUseCase} from "../domain/usecase/create-note.use-case";
import {DeleteNoteUseCase} from "../domain/usecase/delete-note.use-case";
import {GetAllNotesUseCase} from "../domain/usecase/get-all-notes.use-case";
import {GetNoteByIdUseCase} from "../domain/usecase/get-note-by-id.use-case";
import {UpdateNoteUseCase} from "../domain/usecase/update-note.use-case";
import {NoteController} from "../presentation/note/controller/note.controller";
import {MongoDatabase} from "../data/database/mongo.database";
import {GetUserByIdUseCase} from "../domain/usecase/get-user-by-id.use-case";
import {RegisterUserUseCase} from "../domain/usecase/register-user.use-case";
import {UserController} from "../presentation/user/controller/user.controller";
import {LoginUseCase} from "../domain/usecase/login.use-case";
import {AuthDatasource} from "../data/datasource/auth.datasource";
import {AuthRepository, AuthRepositoryDI} from "../domain/repository/auth.repository";
import {AuthRepositoryImpl} from "../data/respository/auth.repository.impl";
import {AuthController} from "../presentation/auth/controller/auth.controller";
import {SessionManager} from "../data/database/session.manager";
import {RedisDatasource} from "../data/datasource/redis.datasource";
import {CreateAccessTokenUseCase} from "../domain/usecase/create-access-token.use-case";
import {SaveTokenDataUseCase} from "../domain/usecase/save-token-data.use-case";
import {CheckRefreshTokenValidUseCase} from "../domain/usecase/check-refresh-token-valid.use-case";
import {DeleteTokenDataUseCase} from "../domain/usecase/delete-token-data.use-case";

const container = new Container();

container.bind(MongoDatabase).toSelf().inSingletonScope();
container.bind(SessionManager).toSelf().inSingletonScope();

container.bind(RedisDatasource).toSelf().inSingletonScope();
container.bind(NoteDatasource).toSelf().inSingletonScope();
container.bind(AuthDatasource).toSelf().inSingletonScope();

container.bind<NoteRepository>(NoteRepositoryDI.Name).to(NoteRepositoryImpl).inSingletonScope();
container.bind<AuthRepository>(AuthRepositoryDI.Name).to(AuthRepositoryImpl).inSingletonScope();

container.bind(CreateNoteUseCase).toSelf().inSingletonScope();
container.bind(DeleteNoteUseCase).toSelf().inSingletonScope();
container.bind(GetAllNotesUseCase).toSelf().inSingletonScope();
container.bind(GetNoteByIdUseCase).toSelf().inSingletonScope();
container.bind(UpdateNoteUseCase).toSelf().inSingletonScope();
container.bind(GetUserByIdUseCase).toSelf().inSingletonScope();
container.bind(RegisterUserUseCase).toSelf().inSingletonScope();
container.bind(LoginUseCase).toSelf().inSingletonScope();
container.bind(CreateAccessTokenUseCase).toSelf().inSingletonScope();
container.bind(SaveTokenDataUseCase).toSelf().inSingletonScope();
container.bind(CheckRefreshTokenValidUseCase).toSelf().inSingletonScope();
container.bind(DeleteTokenDataUseCase).toSelf().inSingletonScope();

container.bind(NoteController).toSelf();
container.bind(UserController).toSelf();
container.bind(AuthController).toSelf();

export {container};