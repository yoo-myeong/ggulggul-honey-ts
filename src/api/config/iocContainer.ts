import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { TestCustomRepository } from '../../libs/repository/test/test.custom.repository';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';
import { UserPointService } from '../userPoint/userPoint.service';

export const getContainer = () => {
  const container = new Container();

  // service
  container.bind(TestService).to(TestService);

  // respository
  container.bind(TestCustomRepository).to(TestCustomRepository);
  container.bind(UserPointRepository).to(UserPointRepository);

  return container;
};
