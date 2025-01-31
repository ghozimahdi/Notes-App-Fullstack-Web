import {inject, injectable} from "inversify";
import {MongoDatabase} from "../database/mongo.database";
import bcrypt from "bcrypt";
import {UserData} from "../model/user.data";
import {RegisterUserRequest} from "../model/register-user.request";
import jwt from "jsonwebtoken";
import {appConfig} from "../../config/env";
import type {StringValue} from "ms";

@injectable()
export class AuthDatasource {
  constructor(@inject(MongoDatabase) private appDb: MongoDatabase) {}

  async getUserById(id: string): Promise<UserData | null> {
    const user = this.appDb.userDao().findById(id);
    if (!user) {
      return null;
    }

    return user;
  }

  async registerUser(user: RegisterUserRequest): Promise<UserData | null> {
    const data = {
      ...user,
      createdAt: new Date().toISOString(),
    };

    const createdUser = await this.appDb.userDao().create(data);

    if (createdUser) {
      const {password, role, ...userWithoutSensitiveData} = createdUser.toObject();
      return userWithoutSensitiveData;
    }

    return null;
  }

  createAccessToken(id: string, expiresIn: StringValue = '1h'): string {
    return jwt.sign({id: id}, appConfig.jwtSecret, {expiresIn: expiresIn});
  }

  async verifyRefreshToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, appConfig.jwtSecret, (err, decoded: any) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded.id);
      });
    });
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