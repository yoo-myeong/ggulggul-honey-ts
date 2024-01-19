import { Container } from 'inversify';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { UserPointCacheService } from '../service/userPointCache.service';

export const getWorkerContainer = () => {
  const container = new Container();

  // service
  container.bind(UserPointCacheService).to(UserPointCacheService);

  return Container.merge(container, getLibContainer());
};
