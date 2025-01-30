import {SaveRefreshTokenInput} from "../../domain/model/save-refresh-token.input";
import {SaveRefreshTokenData} from "../model/save-refresh-token.data";

export const saveRefreshTokenMapper = {
  mapFromDomain(input: SaveRefreshTokenInput): SaveRefreshTokenData {
    return {
      ip: input.ip,
      expiresIn: input.expiresIn,
      refreshToken: input.refreshToken,
      userAgent: input.userAgent,
      userId: input.userId
    };
  },
};