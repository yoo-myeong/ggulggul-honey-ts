import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointRepository } from '../../../../src/libs/repository/userPoint/userPoint.repository';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { AddPointParam } from '../../../../src/api/userPoint/dto/AddPointParam';
import { UserPointService } from '../../../../src/api/userPoint/userPoint.service';
import { CustomError } from '../../../../src/api/filter/CustomError';
import { UsePointParam } from '../../../../src/api/userPoint/dto/UsePointParam';

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

  const createAddPointParam = async (ctx: { userId?: number; point?: number; createdById?: string }) =>
    await AddPointParam.from({
      userId: ctx.userId ?? 1,
      point: ctx.point ?? 1000,
      createdById: ctx.createdById ?? uuidV4(),
    });

  it('포인트 적립', async () => {
    const addPointParam = await createAddPointParam({});
    const sut = new UserPointService(userPointRepository);

    await sut.addPoint(addPointParam);
    const [getPoint] = await userPointRepository.getUserPointSumByUserIds([addPointParam.userId]);

    expect(getPoint.sum).toBe(addPointParam.point);
  });

  it('동일한 요청 id를 가진 포인트는 생성될 수 없다', async () => {
    const addPointParam = await createAddPointParam({});
    const sut = new UserPointService(userPointRepository);

    await sut.addPoint(addPointParam);

    await expect(sut.addPoint(addPointParam)).rejects.toThrow(CustomError);
  });

  it('포인트 사용', async () => {
    const userId = 1;
    const havingPoint = 2000;
    const usingPoint = 1000;
    const addPointParam = await createAddPointParam({
      userId,
      point: havingPoint,
    });
    const usePointParam = new UsePointParam();
    usePointParam.userId = userId;
    usePointParam.point = usingPoint;
    usePointParam.createdById = uuidV4();
    const sut = new UserPointService(userPointRepository);

    await sut.addPoint(addPointParam);
    await sut.usePoint(usePointParam);
    const [point] = await userPointRepository.getUserPointSumByUserIds([userId]);

    expect(point.sum).toBe(havingPoint - usingPoint);
  });
});
