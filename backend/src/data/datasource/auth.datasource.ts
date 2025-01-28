import {inject, injectable} from "inversify";
import {AppDatabase} from "../database/app.database";
import bcrypt from "bcrypt";
import {UserData} from "../model/user.data";
import {RegisterUserRequest} from "../model/register-user.request";

@injectable()
export class AuthDatasource {
  constructor(@inject(AppDatabase) private appDb: AppDatabase) {}

  async getUserById(id: string): Promise<UserData | null> {
    const user = this.appDb.userDao().findById(id);
    if (!user) {
      return null;
    }

    return user;
  }

  async registerUser(user: RegisterUserRequest): Promise<UserData | null> {
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
  }

  async login(email: string, password: string): Promise<UserData | null> {
    const user = await this.findByCredentials(email, password)

    if (user) {
      const {password, role, ...userWithoutSensitiveData} = user.toObject();
      return userWithoutSensitiveData;
    }

    return null;
  }

  async findByCredentials(
    email: string,
    password: string
  ) {
    const user = await this.appDb.userDao().findOne({email});
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user?.password ?? '');
    return isMatch ? user : null;
  };
}