import {UserModel} from "../model/user.model";
import {RegisterUserInput} from "../model/register-user.input";
import type {StringValue} from "ms";
import {SaveRefreshTokenInput} from "../model/save-refresh-token.input";

const AuthRepositoryDI = {
  Name: Symbol.for('AuthRepository'),
};

interface AuthRepository {
  login(email: string, password: string): Promise<UserModel>;

  getUserById(id: string): Promise<UserModel>;

  registerUser(input: RegisterUserInput): Promise<UserModel>;

  verifyRefreshToken(userId: string): Promise<boolean>;

  saveRefreshToken(input: SaveRefreshTokenInput): Promise<void>;

  createAccessToken(id: string, expiresIn?: StringValue): string
}

export {AuthRepository, AuthRepositoryDI}