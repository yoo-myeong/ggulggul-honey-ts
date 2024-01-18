import Redis from 'ioredis';
import { RedisOptions } from 'ioredis/built/redis/RedisOptions';

export class IoRedis {
  private static _redis: Redis;

  public static connect(ctx: RedisOptions) {
    this._redis = new Redis(ctx);
  }

  public static disconnect() {
    this._redis.disconnect();
  }

  static get redis() {
    return this._redis;
  }
}
