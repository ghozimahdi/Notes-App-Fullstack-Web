import {AuthRepository} from "../../domain/repository/auth.repository";
import {inject, injectable} from "inversify";
import {AuthDatasource} from "../datasource/auth.datasource";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(AuthDatasource) private authDataSource: AuthDatasource
  ) {}

  login(email: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}