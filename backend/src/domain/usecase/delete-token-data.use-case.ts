import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";

@injectable()
export class DeleteTokenDataUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  executor(userId: string) {
    return this.repository.deleteTokenData(userId);
  }
}