import { inject, injectable } from 'inversify';
import { Cache } from './cache';
import { UserPointRepository } from '../repository/userPoint/userPoint.repository';

@injectable()
export class UserPointCache {
  private readonly prefix = this.constructor.name;

  private getStoreKey(key: string) {
    return `${this.prefix}:${key}`;
  }

  constructor(
    @inject(Cache)
    private readonly userPointCache: Cache,

    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPointToCache(userId: number) {
    const userCoin = await this.userPointRepository.getUserPointSum(userId);

    await this.userPointCache.set(this.getStoreKey(userId.toString()), userCoin);
  }

  async getPointByUserIdFromCache(userId: number) {
    return parseInt(await this.userPointCache.get(this.getStoreKey(userId.toString())), 10);
  }
}
