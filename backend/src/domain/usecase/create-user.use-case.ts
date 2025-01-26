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
    const missingFields = ["username", "password", "email"].filter(
      (field) => {
        const value = input[field as keyof CreateUserInput];
        return typeof value !== "string" || !value.trim();
      }
    );

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `The following required fields are missing or empty: ${missingFields.join(", ")}`
      );
    }

    return this.repository.createUser(input);
  }
}