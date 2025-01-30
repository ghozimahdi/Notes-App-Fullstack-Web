import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import {BadRequestException, NotFoundException} from "../model/exception";
import {UserModel} from "../model/user.model";

@injectable()
export class LoginUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  async execute(email: string, password: string): Promise<{ user: UserModel, token: string }> {
    const requiredFields = [
      email,
      password,
    ];

    if (requiredFields.some((field) => !field?.trim())) {
      throw new BadRequestException("All required fields must be filled");
    }

    const user = await this.repository.login(email, password);

    if (!user.id) {
      throw new NotFoundException('Invalid email or password.')
    }

    const token = this.repository.createAccessToken(user.id);

    return {
      user: user,
      token: token,
    }
  }
}