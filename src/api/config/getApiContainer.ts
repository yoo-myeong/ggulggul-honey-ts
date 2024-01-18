import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { getLibContainer } from '../../libs/config/getLibContainer';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(TestService).to(TestService);

  return Container.merge(container, getLibContainer());
};
