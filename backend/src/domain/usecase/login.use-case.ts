import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import {BadRequestException} from "../model/exception";

@injectable()
export class LoginUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const requiredFields = [
      email,
      password,
    ];

    if (requiredFields.some((field) => !field?.trim())) {
      throw new BadRequestException("All required fields must be filled");
    }

    return this.repository.login(email, password);
  }
}