import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { TestCustomRepository } from '../../libs/repository/test/test.custom.repository';

export const getContainer = () => {
  const container = new Container();

  // service
  container.bind(TestService).to(TestService);

  // custom respository
  container.bind(TestCustomRepository).to(TestCustomRepository);

  return container;
};
