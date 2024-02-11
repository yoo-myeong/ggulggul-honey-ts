import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { UserCoinEntity } from '../../../../src/libs/entity/userPoint/userCoin.entity';
import { UserCoinRepository } from '../../../../src/libs/repository/userPoint/userCoin.repository';
import { UserCoinService } from '../../../../src/customer-api/userPoint/userCoin.service';
import { CustomError } from '../../../../src/libs/error/filter/CustomError';

describe('UserCoinService', () => {
  let userCoinEntityRepository: Repository<UserCoinEntity>;
  let userCoinRepository: UserCoinRepository;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());

    userCoinEntityRepository = TypeOrm.getRepository<UserCoinEntity>(UserCoinEntity);
    userCoinRepository = new UserCoinRepository(userCoinEntityRepository);
  });

  beforeEach(async () => {
    await userCoinEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('사용 가능한 코인이 없으면 에러를 스로우한다', async () => {
    const sut = new UserCoinService(userCoinRepository);

    await expect(sut.useCoin(1)).rejects.toThrow(CustomError);
  });

  it('코인 첫 사용자는 300~700원이 당첨된다', async () => {
    const coin = UserCoinEntity.create({ userId: 1 });
    await userCoinEntityRepository.insert(coin);
    const sut = new UserCoinService(userCoinRepository);

    const result = await sut.useCoin(1);

    expect(result).toBeGreaterThanOrEqual(300);
    expect(result).toBeLessThanOrEqual(700);
  });

  it('코인 기사용자는 0~2000원이 당첨된다', async () => {
    await userCoinEntityRepository.insert(UserCoinEntity.create({ userId: 1 }));
    await userCoinEntityRepository.insert(UserCoinEntity.create({ userId: 1 }));
    const sut = new UserCoinService(userCoinRepository);

    const result = await sut.useCoin(1);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2000);
  });
});
