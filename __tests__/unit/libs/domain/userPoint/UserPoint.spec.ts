import { UserPointDomain } from '../../../../../src/libs/domain/userPoint/userPoint.domain';
import { CustomError } from '../../../../../src/api/filter/CustomError';

describe('UserPointDomain', () => {
  describe('use point', () => {
    it('보유한 포인트보다 큰 포인트를 사용할 수 없다', async () => {
      const point = 1000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(150)).toThrow(CustomError);
    });

    it('사용하려는 포인트가 사용가능 최대 포인트(2000)을 넘을 수 없다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(2500)).toThrow(CustomError);
    });

    it('사용하려는 포인트는 최소 사용포인트(1000)을 넘어야 한다.', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(500)).toThrow(CustomError);
    });

    it('사용하려는 포인트는 100원 단위이어야 한다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(150)).toThrow(CustomError);
    });

    it('사용하고자 하는 포인트가 음수값이 될 수 없다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(-1000)).toThrow(CustomError);
    });

    it('포인트 사용', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });
      const usingPoint = 1000;

      const afterPoint = sut.use(1000);

      expect(afterPoint).toBe(point - usingPoint);
    });
  });

  describe('add point', () => {
    it('적립하려는 포인트가 적립가능 최대 포인트(2000)을 넘으면 에러를 던진다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.add(2500)).toThrow(CustomError);
    });

    it('적립하려는 포인트는 100원 단위이어야 한다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.use(150)).toThrow(CustomError);
    });

    it('적립하고자 하는 포인트가 음수값이 될 수 없다', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });

      expect(() => sut.add(-1000)).toThrow(CustomError);
    });

    it('포인트 적립', async () => {
      const point = 3000;
      const sut = UserPointDomain.from({
        point,
      });
      const addingPoint = 1000;

      const afterPoint = sut.add(1000);

      expect(afterPoint).toBe(point + addingPoint);
    });
  });
});
