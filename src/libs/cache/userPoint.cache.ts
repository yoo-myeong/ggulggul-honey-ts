import { inject } from 'inversify';
import { CacheService } from './cacheService';

export class UserPointCache {
  private readonly prefix = this.constructor.name;

  private getStoreKey(key: string) {
    return `${this.prefix}:${key}`;
  }

  constructor(
    @inject(CacheService)
    private readonly cacheService: CacheService,
  ) {}

  async set(userId: number, point: number) {
    await this.cacheService.set(this.getStoreKey(userId.toString()), point);
  }
}
