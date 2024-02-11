import { inject, injectable } from 'inversify';
import Redis from 'ioredis';
import { UserPointRepository } from '../repository/userPoint/userPoint.repository';
import { InjectType } from '../iocContainer/InjectType';
import { CustomError } from '../error/filter/CustomError';
import { ErrorCode } from '../error/errorCode';

@injectable()
export class UserPointCache {
  private readonly prefix = this.constructor.name;

  private getStoreKey(key: string) {
    return `${this.prefix}:${key}`;
  }

  constructor(
    @inject(InjectType.IoRedis)
    private readonly cache: Redis,

    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPointToCache(userIds: number[]) {
    const userCoins = await this.userPointRepository.getUserPointSumByUserIds(userIds);

    const cachingData = userCoins.reduce((acc, cur) => {
      acc.set(this.getStoreKey(cur.userId.toString()), cur.sum.toString());

      return acc;
    }, new Map<string, string>());

    await this.cache.mset(cachingData);
  }

  async getPointByUserIdFromCache(userId: number) {
    const cacheData = await this.cache.get(this.getStoreKey(userId.toString()));

    if (!cacheData) throw new CustomError(ErrorCode.NOT_FOUND, `no cache by userId(${userId})`);

    return parseInt(cacheData, 10);
  }
}
