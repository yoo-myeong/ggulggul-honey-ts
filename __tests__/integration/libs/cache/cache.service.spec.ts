import Redis from 'ioredis';
import { IoRedis } from '../../../../src/libs/redis/IoRedis';
import { getRedisTestOption } from '../../getRedisTestOption';
import { CacheService } from '../../../../src/libs/cache/cacheService';
import { CustomError } from '../../../../src/api/filter/CustomError';

describe('CacheService', () => {
  let redis: Redis;

  beforeAll(() => {
    IoRedis.connect(getRedisTestOption());
    redis = IoRedis.redis;
  });

  beforeEach(async () => await redis.flushall());

  afterAll(() => redis.disconnect());

  it('캐시 저장 후 조회할 수 있다', async () => {
    const key = 'key';
    const value = 'value';

    const sut = new CacheService(redis);
    await sut.set(key, value);
    const result = await sut.get(key);

    expect(result).toBe(value);
  });

  it('get은 없으면 에러를 스로우한다', async () => {
    const key = 'key';

    const sut = new CacheService(redis);

    await expect(sut.get(key)).rejects.toThrow(CustomError);
  });

  it('find은 없으면 null을 반환한다', async () => {
    const key = 'key';

    const sut = new CacheService(redis);
    const result = await sut.find(key);

    expect(result).toBeNull();
  });

  it('파기시간(ms)을 지정할 수 있다', async () => {
    const key = 'key';
    const value = 'value';
    const ttl = 10;

    const sut = new CacheService(redis);
    await sut.set(key, value, ttl);
    await new Promise((r) => {
      setTimeout(r, ttl * 2);
    });
    const result = await sut.find(key);

    expect(result).toBeNull();
  });
});
