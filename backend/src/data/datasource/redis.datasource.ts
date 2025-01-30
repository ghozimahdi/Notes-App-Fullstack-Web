import {inject, injectable} from "inversify";
import {SessionManager} from "../database/session.manager";

@injectable()
export class RedisDatasource {
  static REFRESH_TOKEN_EXPIRATION: number = 604800;

  constructor(@inject(SessionManager) private session: SessionManager) {}

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    const key = `refresh:${userId}`;
    await this.session.set<string>(key, token, RedisDatasource.REFRESH_TOKEN_EXPIRATION);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const key = `refresh:${userId}`;
    return await this.session.get<string>(key);
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
}