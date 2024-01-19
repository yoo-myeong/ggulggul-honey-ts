import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { IoRedis } from '../../../../src/libs/redis/IoRedis';
import { getRedisTestOption } from '../../getRedisTestOption';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointCacheService } from '../../../../src/worker/service/userPointCache.service';
import { CacheService } from '../../../../src/libs/cache/cacheService';
import { UserPointRepository } from '../../../../src/libs/repository/userPoint/userPoint.repository';

describe('UserPointRedisService', () => {
  let redis: Redis;
  let userPointLogEntityRepository: Repository<UserPointLogEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    userPointLogEntityRepository = TypeOrm.getRepository(UserPointLogEntity);

    IoRedis.connect(getRedisTestOption());
    redis = IoRedis.redis;
  });

  beforeEach(async () => {
    await userPointLogEntityRepository.delete({});
    await redis.flushall();
  });

  it('캐시저장소에 유저의 포인트를 갱신하고 조회할 수 있다', async () => {
    const userPointRepository = new UserPointRepository(userPointLogEntityRepository);
    const sut = new UserPointCacheService(new CacheService(redis), userPointRepository);
    const userPointLogEntity = new UserPointLogEntity();
    userPointLogEntity.userId = 1;
    userPointLogEntity.pointRequestId = v4();
    userPointLogEntity.changePoint = 100;
    userPointLogEntity.modifiedBy = 'test';
    await userPointRepository.insert(userPointLogEntity);

    await sut.addPointToCache(userPointLogEntity.userId);
    const result = await sut.getPointByUserIdFromCache(userPointLogEntity.userId);

    expect(result).toBe(userPointLogEntity.changePoint);
  });
});
