import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../../getMySqlTypeOrmTestOption';
import { UserPointLogEntity } from '../../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointRepository } from '../../../../../src/libs/repository/userPoint/userPoint.repository';
import { createUserPointLogEntity } from '../../entity/userPointLog.entity';

describe('UserPointRepository', () => {
  let userPointLogEntityRepository: Repository<UserPointLogEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    userPointLogEntityRepository = TypeOrm.getRepository<UserPointLogEntity>(UserPointLogEntity);
  });

  beforeEach(async () => {
    await userPointLogEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('포인트를 합산하여 현재포인트를 조회한다', async () => {
    const sut = new UserPointRepository(userPointLogEntityRepository);
    const userId = 1;
    const changePoint1 = 1000;
    const changePoint2 = 400;
    const log1 = createUserPointLogEntity({ userId, changePoint: changePoint1 });
    const log2 = createUserPointLogEntity({ userId, changePoint: changePoint2 });
    await Promise.all([userPointLogEntityRepository.save(log1), userPointLogEntityRepository.save(log2)]);

    const point = await sut.getUserPointSum([userId]);

    expect(point[0].sum).toBe(changePoint1 + changePoint2);
  });

  it('중복 유저는 중복을 제거하고 조회한다', () => {});
});
