import { RandomPoint } from '../../../../../src/libs/domain/userPoint/RandomPoint';

describe('RandomPoint', () => {
  it('첫 포인트 지급은 300~700원 사이이다.', () => {
    const sut = new RandomPoint();

    const point = sut.generateRandomPointForFirst();

    expect(point >= 300).toBeTruthy();
    expect(point <= 700).toBeTruthy();
  });

  it('포인트 지급은 0~2000원 사이이다.', () => {
    const sut = new RandomPoint();

    const point = sut.generateRandomPoint();

    expect(point >= 0).toBeTruthy();
    expect(point <= 2000).toBeTruthy();
  });
});
