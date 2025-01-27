import {inject, injectable} from "inversify";
import {RegisterUserInput} from "../model/register-user.input";
import {UserModel} from "../model/user.model";
import {BadRequestException} from "../model/exception";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(AuthRepositoryDI.Name) private repository: AuthRepository
  ) {}

  async execute(input: RegisterUserInput): Promise<UserModel> {
    const missingFields = ["username", "password", "email"].filter(
      (field) => {
        const value = input[field as keyof RegisterUserInput];
        return typeof value !== "string" || !value.trim();
      }
    );

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `The following required fields are missing or empty: ${missingFields.join(", ")}`
      );
    }

    return this.repository.registerUser(input);
  }
}