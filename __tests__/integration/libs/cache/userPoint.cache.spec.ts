import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { IoRedis } from '../../../../src/libs/redis/IoRedis';
import { getRedisTestOption } from '../../getRedisTestOption';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointCache } from '../../../../src/libs/cache/userPoint.cache';
import { Cache } from '../../../../src/libs/cache/cache';
import { UserPointRepository } from '../../../../src/libs/repository/userPoint/userPoint.repository';
import { createUserPointLogEntity } from '../entity/userPointLog.entity';

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

  afterAll(async () => {
    await TypeOrm.disconnect();
    IoRedis.disconnect();
  });

  it('캐시저장소에 유저의 포인트를 갱신하고 조회할 수 있다', async () => {
    const userPointRepository = new UserPointRepository(userPointLogEntityRepository);
    const sut = new UserPointCache(new Cache(redis), userPointRepository);
    const userPointLogEntity = createUserPointLogEntity({
      userId: 1,
      changePoint: 1000,
    });
    await userPointRepository.insert(userPointLogEntity);

    await sut.addPointToCache(userPointLogEntity.userId);
    const result = await sut.getPointByUserIdFromCache(userPointLogEntity.userId);

    expect(result).toBe(userPointLogEntity.changePoint);
  });
});
