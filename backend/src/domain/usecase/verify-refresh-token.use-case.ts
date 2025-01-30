import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";

@injectable()
export class VerifyRefreshTokenUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  execute(userId: string) {
    return this.repository.verifyRefreshToken(userId);
  }
}