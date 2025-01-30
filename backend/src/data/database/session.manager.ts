import {SessionOptions} from "express-session";
import {appConfig, Flavor} from "../../config/env";
import {RedisStore} from "connect-redis";
import {createClient, RedisClientType} from "redis";
import {injectable} from "inversify";

@injectable()
export class SessionManager {
  private readonly redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      socket: {
        host: appConfig.redisHost,
      },
    });

    this.redisClient.on("connect", () => console.log("Connected to Redis"));
    this.redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    process.on("SIGINT", this.handleExit.bind(this));
    process.on("SIGTERM", this.handleExit.bind(this));
  }

  async set<T>(key: string, value: T, expiresIn?: number): Promise<void> {
    await this.connectRedis();
    const data = JSON.stringify(value);
    if (expiresIn) {
      await this.redisClient.set(key, data, {
        EX: expiresIn,
      });
    } else {
      await this.redisClient.set(key, data);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    await this.connectRedis();
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) as T : null;
  }

  async del(key: string): Promise<void> {
    await this.connectRedis();
    await this.redisClient.del(key);
  }

  async connectRedis(): Promise<void> {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect();
    }
  }

  private async getRedisStore(): Promise<RedisStore> {
    await this.connectRedis();

    return new RedisStore({
      client: this.redisClient,
      prefix: "sess:",
    });
  }

  async createSession(): Promise<SessionOptions> {
    const redisStore = await this.getRedisStore();

    return {
      store: redisStore,
      secret: appConfig.cookiesSecretKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: appConfig.flavor === Flavor.PRODUCTION,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    };
  }

  async closeRedis(): Promise<void> {
    if (this.redisClient.isOpen) {
      await this.redisClient.disconnect();
      console.log("Redis connection closed");
    }
  }

  private async handleExit(): Promise<void> {
    await this.closeRedis();
    process.exit(0);
  }
}