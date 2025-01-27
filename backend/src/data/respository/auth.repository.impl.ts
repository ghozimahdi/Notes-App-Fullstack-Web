import {AuthRepository} from "../../domain/repository/auth.repository";
import {inject, injectable} from "inversify";
import {AuthDatasource} from "../datasource/auth.datasource";
import {UserModel} from "../../domain/model/user.model";
import {userMapper} from "../mapper/user.mapper";
import {RegisterUserInput} from "../../domain/model/register-user.input";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(AuthDatasource) private authDataSource: AuthDatasource
  ) {}

  async login(email: string, password: string): Promise<UserModel> {
    try {
      const userData = await this.authDataSource.login(email, password);
      return userMapper.mapFromData(userData);
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id: string): Promise<UserModel> {
    try {
      const data = await this.authDataSource.getUserById(id);
      return userMapper.mapFromData(data);
    } catch (e) {
      throw e;
    }
  }

  async registerUser(input: RegisterUserInput): Promise<UserModel> {
    try {
      const data = await this.authDataSource.registerUser(input);
      return userMapper.mapFromData(data);
    } catch (e) {
      throw e;
    }
  }
}