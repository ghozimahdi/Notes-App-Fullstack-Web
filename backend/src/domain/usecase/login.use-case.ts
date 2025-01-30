import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import {BadRequestException} from "../model/exception";
import {UserModel} from "../model/user.model";
import jwt from "jsonwebtoken";
import {appConfig} from "../../config/env";

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

    const token = jwt.sign(user, appConfig.jwtSecret, {
      expiresIn: '1h',
    });

    return {
      user: user,
      token: token,
    }
  }
}