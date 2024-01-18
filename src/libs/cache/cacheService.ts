import { inject, injectable } from 'inversify';
import Redis from 'ioredis';
import { InjectType } from '../config/InjectType';
import { CustomError } from '../../api/filter/CustomError';
import { ErrorCode } from '../error/errorCode';

@injectable()
export class CacheService {
  constructor(
    @inject(InjectType.IoRedis)
    private readonly cache: Redis,
  ) {}
  set(key: string, value: string | number | Buffer, ttl?: number) {
    if (ttl) {
      return this.cache.set(key, value, 'PX', ttl);
    }
    return this.cache.set(key, value);
  }

  find(key: string) {
    return this.cache.get(key);
  }

  async get(key: string) {
    const result = await this.cache.get(key);
    if (!result) throw new CustomError(ErrorCode.NOT_FOUND, `redis not found by(${key})`);

    return result;
  }
}
