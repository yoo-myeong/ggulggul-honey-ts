import { Container } from 'inversify';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { UserPointCache } from '../../libs/cache/userPoint.cache';

export const getWorkerContainer = () => {
  const container = new Container();

  // service
  container.bind(UserPointCache).to(UserPointCache);

  return Container.merge(container, getLibContainer());
};
