import { inject, injectable } from 'inversify';
import { CacheService } from '../../libs/cache/cacheService';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';

@injectable()
export class UserPointCacheService {
  private readonly prefix = this.constructor.name;

  private getStoreKey(key: string) {
    return `${this.prefix}:${key}`;
  }

  constructor(
    @inject(CacheService)
    private readonly userPointCache: CacheService,

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
