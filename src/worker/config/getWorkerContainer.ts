import { Container } from 'inversify';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { UserPointCache } from '../../libs/cache/userPoint.cache';
import { AddPointToRdbService } from '../service/addPointToRdb.service';

export const getWorkerContainer = () => {
  const container = new Container();

  // service
  container.bind(UserPointCache).to(UserPointCache);
  container.bind(AddPointToRdbService).to(AddPointToRdbService);

  return Container.merge(container, getLibContainer());
};
