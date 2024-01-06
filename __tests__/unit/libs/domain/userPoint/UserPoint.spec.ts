import { UserPointDomain } from '../../../../../src/libs/domain/userPoint/UserPoint';
import { UserPointDomainUseParams } from '../../../../../src/libs/domain/userPoint/dto/UserPointDomainUseParams';
import { CustomError } from '../../../../../src/api/filter/CustomError';

describe('UserPointDomain', () => {
  it('보유한 포인트보다 큰 포인트를 사용할 수 없다', async () => {
    const point = 1000;
    const sut = await UserPointDomain.from({
      userPointId: 1,
      point,
    });
    const param = new UserPointDomainUseParams();
    param.changePoint = 1500;
    param.modifiedBy = 'user';

    expect(() => sut.use(param)).toThrow(CustomError);
  });

  it('사용하려는 포인트가 사용가능 최대 포인트(2000)을 넘으면 에러를 던진다', async () => {
    const point = 3000;
    const sut = await UserPointDomain.from({
      userPointId: 1,
      point,
    });
    const param = new UserPointDomainUseParams();
    param.changePoint = 2500;
    param.modifiedBy = 'user';

    expect(() => sut.use(param)).toThrow(CustomError);
  });
});
