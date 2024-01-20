import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointRepository } from '../../../../src/libs/repository/userPoint/userPoint.repository';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { AddPointParam } from '../../../../src/api/userPoint/dto/AddPointParam';
import { UserPointService } from '../../../../src/api/userPoint/userPoint.service';

describe('UserPointService', () => {
  let userPointLogEntityRepository: Repository<UserPointLogEntity>;
  let userPointRepository: UserPointRepository;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());

    userPointLogEntityRepository = TypeOrm.getRepository<UserPointLogEntity>(UserPointLogEntity);
    userPointRepository = new UserPointRepository(userPointLogEntityRepository);
  });

  beforeEach(async () => {
    await userPointLogEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('포인트 적립', async () => {
    const sut = new UserPointService(userPointRepository);
    const userId = 1;
    const point = 1000;
    const addPointParam = await AddPointParam.from({ userId, point, apiRequestId: uuidV4() });

    await sut.addPoint(addPointParam);
    const [getPoint] = await userPointRepository.getUserPointSumByUserIds([userId]);

    expect(getPoint.sum).toBe(point);
  });
});
