import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import type {StringValue} from "ms";

@injectable()
export class CreateAccessTokenUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  execute(id: string, expiresIn?: StringValue): string {
    return this.repository.createAccessToken(id, expiresIn)
  }
}