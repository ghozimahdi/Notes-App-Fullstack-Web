import {AuthRepository} from "../../domain/repository/auth.repository";
import {inject, injectable} from "inversify";
import {AuthDatasource} from "../datasource/auth.datasource";
import {UserModel} from "../../domain/model/user.model";
import {userMapper} from "../mapper/user.mapper";
import {RegisterUserInput} from "../../domain/model/register-user.input";
import {safeCall} from "../safe.call";
import {RedisDatasource} from "../datasource/redis.datasource";
import {SaveRefreshTokenInput} from "../../domain/model/save-refresh-token.input";
import {saveRefreshTokenMapper} from "../mapper/save-refresh-token.mapper";
import type {StringValue} from "ms";
import {refreshTokenMapper} from "../mapper/refresh-token.mapper";
import {RefreshTokenModel} from "../../domain/model/refresh-token.model";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(AuthDatasource) private authDataSource: AuthDatasource,
    @inject(RedisDatasource) private redisDatasource: RedisDatasource
  ) {}

  @safeCall()
  async deleteRefreshToken(id: string): Promise<boolean> {
    await this.redisDatasource.deleteTokenData(id)
    return true;
  }

  @safeCall()
  async saveRefreshToken(input: SaveRefreshTokenInput): Promise<void> {
    const request = saveRefreshTokenMapper.mapFromDomain(input);
    await this.redisDatasource.saveTokenData(request);
  }

  @safeCall()
  async verifyAndGetRefreshToken(refreshToken: string): Promise<RefreshTokenModel> {
    const userId = await this.authDataSource.verifyRefreshToken(refreshToken);
    const refreshTokenData = await this.redisDatasource.getTokenData(userId);
    return refreshTokenMapper.mapFromData(refreshTokenData);
  }

  @safeCall()
  createAccessToken(id: string, expiresIn: StringValue = '1h'): string {
    return this.authDataSource.createAccessToken(id, expiresIn);
  }

  @safeCall()
  async login(email: string, password: string): Promise<UserModel> {
    const userData = await this.authDataSource.login(email, password);
    return userMapper.mapFromData(userData);
  }

  @safeCall()
  async getUserById(id: string): Promise<UserModel> {
    const data = await this.authDataSource.getUserById(id);
    return userMapper.mapFromData(data);
  }

  @safeCall()
  async registerUser(input: RegisterUserInput): Promise<UserModel> {
    const data = await this.authDataSource.registerUser(input);
    return userMapper.mapFromData(data);
  }
}