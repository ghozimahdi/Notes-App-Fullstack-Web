import {inject, injectable} from "inversify";
import {UserRepository, UserRepositoryDI} from "../repository/user.repository";
import {CreateUserInput} from "../model/create-user.input";
import {UserModel} from "../model/user.model";
import {BadRequestException} from "../model/exception";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserRepositoryDI.Name) private repository: UserRepository
  ) {}

  async execute(input: CreateUserInput): Promise<UserModel> {
    const requiredFields = [
      input.username,
      input.password,
      input.email,
    ];

    if (requiredFields.some((field) => !field?.trim())) {
      throw new BadRequestException("All required fields must be filled except address");
    }

    return this.repository.createUser(input);
  }
}