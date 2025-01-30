import {inject, injectable} from "inversify";
import {SessionManager} from "../database/session.manager";
import {SaveRefreshTokenData} from "../model/save-refresh-token.data";

@injectable()
export class RedisDatasource {
  constructor(@inject(SessionManager) private session: SessionManager) {}

  async saveRefreshToken(request: SaveRefreshTokenData): Promise<void> {
    const key = `refresh:${request.userId}`;
    const expiresIn = this.parseTimeToSeconds(request.expiresIn);
    await this.session.set<SaveRefreshTokenData>(key, request, expiresIn);
  }

  async getRefreshToken(userId: string): Promise<string> {
    const key = `refresh:${userId}`;
    const data = await this.session.get<SaveRefreshTokenData>(key);
    return data ? data.refreshToken : '';
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const key = `refresh:${userId}`;
    await this.session.del(key);
  }

  async saveData<T>(key: string, data: T, expiresIn?: number): Promise<void> {
    await this.session.set<T>(key, data, expiresIn);
  }

  async getData<T>(key: string): Promise<T | null> {
    return await this.session.get<T>(key);
  }

  private parseTimeToSeconds(time: string | number): number {
    if (typeof time === "number") {
      return time;
    }

    // Regular expression to match a time string (e.g., "7h", "30m", "1d")
    const match = time.match(/^(\d+)([smhd])$/);

    if (!match) {
      throw new Error("Invalid expiresIn format. Use formats like '7h', '30m', '1d'.");
    }

    const value = parseInt(match[1], 10);
    const unit = match[2]; // Extract the time unit (s, m, h, d)

    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 3600;
      case "d":
        return value * 86400;
      default:
        throw new Error("Unrecognized time unit.");
    }
  }
}