import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import {SaveRefreshTokenInput} from "../model/save-refresh-token.input";

@injectable()
export class SaveRefreshTokenUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  execute(input: SaveRefreshTokenInput) {
    return this.repository.saveRefreshToken(input);
  }
}