import { Container } from 'inversify';
import { TestCustomRepository } from '../repository/test/test.custom.repository';
import { UserPointRepository } from '../repository/userPoint/userPoint.repository';
import { UserCoinRepository } from '../repository/userPoint/userCoin.repository';

export const getLibContainer = () => {
  const container = new Container();

  // respository
  container.bind(TestCustomRepository).to(TestCustomRepository);
  container.bind(UserPointRepository).to(UserPointRepository);
  container.bind(UserCoinRepository).to(UserCoinRepository);

  return container;
};
