import { inject, injectable } from 'inversify';
import { CacheService } from '../../libs/cache/cacheService';

@injectable()
export class AddPointToRedisService {
  constructor(
    @inject(CacheService)
    private readonly userPointCache: CacheService,
  ) {}

  async addPointToRedis() {}
}
