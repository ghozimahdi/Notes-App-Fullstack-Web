import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";
import {UserData} from "../model/user.data";

@injectable()
export class UserDatasource {
  constructor(@inject(AppDatabase) private appDb: AppDatabase) {}

  async getUserById(id: string): Promise<UserData | null> {
    try {
      const user = this.appDb.userDao().findById(id);
      if (!user) {
        return null;
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  async createUser(user: Omit<UserData, '_id'>): Promise<UserData | null> {
    try {
      const data = {
        ...user,
        createdAt: new Date().toISOString(),
      };

      console.log(data);
      const result = await this.appDb.userDao().create(data);
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    }
  }
}