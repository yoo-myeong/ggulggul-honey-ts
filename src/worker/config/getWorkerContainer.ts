import { Container } from 'inversify';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { AddPointToRedisService } from '../service/addPointToRedis.service';

export const getWorkerContainer = () => {
  const container = new Container();

  // service
  container.bind(AddPointToRedisService).to(AddPointToRedisService);

  return Container.merge(container, getLibContainer());
};
