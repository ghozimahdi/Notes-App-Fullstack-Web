import {UserModel} from "../model/user.model";
import {CreateUserInput} from "../model/create-user.input";

const UserRepositoryDI = {
  Name: Symbol.for('UserRepository'),
};

interface UserRepository {
  getUserById(id: string): Promise<UserModel>;

  createUser(input: CreateUserInput): Promise<UserModel>;
}

export {UserRepository, UserRepositoryDI}