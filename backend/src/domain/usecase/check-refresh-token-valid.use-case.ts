import {inject, injectable} from "inversify";
import {AuthRepository, AuthRepositoryDI} from "../repository/auth.repository";
import {RefreshTokenModel} from "../model/refresh-token.model";
import {UnauthorizedException} from "../model/exception";

@injectable()
export class CheckRefreshTokenValidUseCase {
  constructor(@inject(AuthRepositoryDI.Name) private repository: AuthRepository) {}

  async execute(refreshToken: string): Promise<RefreshTokenModel> {
    const model = await this.repository.verifyAndGetRefreshToken(refreshToken);

    if (!model.refreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return model;
  }
}