import {UserModel} from "../model/user.model";
import {RegisterUserInput} from "../model/register-user.input";
import type {StringValue} from "ms";
import {SaveRefreshTokenInput} from "../model/save-refresh-token.input";
import {RefreshTokenModel} from "../model/refresh-token.model";

const AuthRepositoryDI = {
  Name: Symbol.for('AuthRepository'),
};

interface AuthRepository {
  login(email: string, password: string): Promise<UserModel>;

  getUserById(id: string): Promise<UserModel>;

  deleteTokenData(id: string): Promise<boolean>;

  registerUser(input: RegisterUserInput): Promise<UserModel>;

  verifyAndGetRefreshToken(refreshToken: string): Promise<RefreshTokenModel>;

  saveTokenData(input: SaveRefreshTokenInput): Promise<void>;

  createAccessToken(id: string, expiresIn?: StringValue): string
}

export {AuthRepository, AuthRepositoryDI}