import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { UserCoinEntity } from '../../../../src/libs/entity/userPoint/userCoin.entity';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointRepository } from '../../../../src/libs/repository/userPoint/userPoint.repository';
import { CustomError } from '../../../../src/libs/error/filter/CustomError';
import { AddPointToRdbService } from '../../../../src/worker/service/addPointToRdb.service';
import { UserCoinRepository } from '../../../../src/libs/repository/userPoint/userCoin.repository';

describe('AddPointToRdbService', () => {
  let coinEntityRepository: Repository<UserCoinEntity>;
  let pointLogEntityRepository: Repository<UserPointLogEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());

    coinEntityRepository = TypeOrm.getRepository(UserCoinEntity);
    pointLogEntityRepository = TypeOrm.getRepository(UserPointLogEntity);
  });

  beforeEach(async () => {
    await coinEntityRepository.delete({});
    await pointLogEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('코인을 조회해서 발급 포인트를 적립시킨다', async () => {
    const coinEntity = UserCoinEntity.create({
      userId: 1,
      issuePoint: 1000,
    });
    const { id } = await coinEntityRepository.save(coinEntity);
    const pointLogRepository = new UserPointRepository(pointLogEntityRepository);
    const sut = new AddPointToRdbService(new UserCoinRepository(coinEntityRepository), pointLogRepository);

    await sut.addPointByCoinIds([id]);
    const [{ sum }] = await pointLogRepository.getUserPointSumByUserIds([coinEntity.userId]);

    expect(sum).toBe(coinEntity.issuePoint);
  });

  it('조회되지 않는 코인은 포인트를 충전할 수 없다', async () => {
    const sut = new AddPointToRdbService(
      new UserCoinRepository(coinEntityRepository),
      new UserPointRepository(pointLogEntityRepository),
    );

    await expect(sut.addPointByCoinIds([1])).rejects.toThrow(CustomError);
  });

  it('포인트를 발급받지 않은 코인은 포인트를 충전할 수 없다', async () => {
    const coinEntity = UserCoinEntity.create({
      userId: 1,
    });
    const { id } = await coinEntityRepository.save(coinEntity);
    const pointLogRepository = new UserPointRepository(pointLogEntityRepository);
    const sut = new AddPointToRdbService(new UserCoinRepository(coinEntityRepository), pointLogRepository);

    await expect(sut.addPointByCoinIds([id])).rejects.toThrow(CustomError);
  });
});
