import { UserPointDomain } from '../../../../../src/libs/domain/userPoint/UserPoint';
import { CustomError } from '../../../../../src/api/filter/CustomError';

describe('UserPointDomain', () => {
  it('보유한 포인트보다 큰 포인트를 사용할 수 없다', async () => {
    const point = 1000;
    const sut = await UserPointDomain.from({
      userPointId: 1,
      point,
    });

    expect(() => sut.use(150)).toThrow(CustomError);
  });

  it('사용하려는 포인트가 사용가능 최대 포인트(2000)을 넘으면 에러를 던진다', async () => {
    const point = 3000;
    const sut = await UserPointDomain.from({
      userPointId: 1,
      point,
    });

    expect(() => sut.use(2500)).toThrow(CustomError);
  });
});
