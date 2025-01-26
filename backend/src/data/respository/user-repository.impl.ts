import {inject, injectable} from "inversify";
import {UserRepository} from "../../domain/repository/user.repository";
import {CreateUserInput} from "../../domain/model/create-user.input";
import {UserModel} from "../../domain/model/user.model";
import {UserDatasource} from "../datasource/user.datasource";
import {userMapper} from "../mapper/user.mapper";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(UserDatasource) private userDataSource: UserDatasource) {}

  async getUserById(id: string): Promise<UserModel> {
    try {
      const data = await this.userDataSource.getUserById(id);
      return userMapper.mapFromData(data);
    } catch (e) {
      throw e;
    }
  }

  async createUser(input: CreateUserInput): Promise<UserModel> {
    try {
      const model = userMapper.mapFromDomain(input);
      const data = await this.userDataSource.createUser(model);
      return userMapper.mapFromData(data);
    } catch (e) {
      throw e;
    }
  }

}