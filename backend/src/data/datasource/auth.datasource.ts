import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";

@injectable()
export class AuthDatasource {
  constructor(@inject(AppDatabase) private appDb: AppDatabase) {}

  async login(email: string, password: string) {

  }
}