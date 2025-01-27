import {UserModel} from "../model/user.model";
import {RegisterUserInput} from "../model/register-user.input";

const AuthRepositoryDI = {
  Name: Symbol.for('AuthRepository'),
};

interface AuthRepository {
  login(email: string, password: string): Promise<UserModel>;

  getUserById(id: string): Promise<UserModel>;

  registerUser(input: RegisterUserInput): Promise<UserModel>;
}

export {AuthRepository, AuthRepositoryDI}