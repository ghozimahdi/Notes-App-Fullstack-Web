import {UserModel} from "../model/user.model";
import {RegisterUserInput} from "../model/register-user.input";
import type {StringValue} from "ms";

const AuthRepositoryDI = {
  Name: Symbol.for('AuthRepository'),
};

interface AuthRepository {
  login(email: string, password: string): Promise<UserModel>;

  getUserById(id: string): Promise<UserModel>;

  registerUser(input: RegisterUserInput): Promise<UserModel>;

  verifyRefreshToken(token: string): Promise<boolean>;

  createAccessToken(id: string): string
}

export {AuthRepository, AuthRepositoryDI}