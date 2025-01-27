import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";
import {UserData} from "../model/user.data";
import bcrypt from "bcrypt";
import {CreateUserRequest} from "../model/create-user.request";

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

  async createUser(user: CreateUserRequest): Promise<UserData | null> {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHas = await bcrypt.hash(user.password, salt);

      const data = {
        ...user,
        password: passwordHas,
        createdAt: new Date().toISOString(),
      };

      const createdUser = await this.appDb.userDao().create(data);

      if (createdUser) {
        const {password, role, ...userWithoutSensitiveData} = createdUser.toObject();
        return userWithoutSensitiveData;
      }

      return null;
    } catch (e) {
      throw e;
    }
  }
}