import {MongoServerError} from 'mongodb';
import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";
import bcrypt from "bcrypt";
import {UserData} from "../model/user.data";
import {RegisterUserRequest} from "../model/register-user.request";
import {BadRequestException, EmailAlreadyRegisteredException} from "../../domain/model/exception";

@injectable()
export class AuthDatasource {
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

  async registerUser(user: RegisterUserRequest): Promise<UserData | null> {
    try {
      const passwordHash = await bcrypt.hash(user.password, 10);

      const data = {
        ...user,
        password: passwordHash,
        createdAt: new Date().toISOString(),
      };

      const createdUser = await this.appDb.userDao().create(data);

      if (createdUser) {
        const {password, role, ...userWithoutSensitiveData} = createdUser.toObject();
        return userWithoutSensitiveData;
      }

      return null;
    } catch (e) {
      const mongoError = e as MongoServerError;
      if (mongoError.code === 11000) {
        throw new EmailAlreadyRegisteredException();
      }
      throw e;
    }
  }

  async login(email: string, password: string): Promise<UserData | null> {
    try {
      const user = await this.appDb.userDao().findOne({
        email: email,
      });

      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(password ?? '', user?.password ?? '');

      if (isMatch) {
        const {password, role, ...userWithoutSensitiveData} = user!.toObject();
        return userWithoutSensitiveData;
      }

      return null;
    } catch (e) {
      throw e;
    }
  }
}