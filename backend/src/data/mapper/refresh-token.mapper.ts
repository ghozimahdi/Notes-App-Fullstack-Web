import {SaveRefreshTokenData} from "../model/save-refresh-token.data";
import {RefreshTokenModel} from "../../domain/model/refresh-token.model";

export const refreshTokenMapper = {
  mapFromData(data: SaveRefreshTokenData | null): RefreshTokenModel {
    return {
      refreshToken: data?.refreshToken ?? '',
      userId: data?.userId ?? '',
    };
  }
}