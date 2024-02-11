import { Container } from 'inversify';
import { getLibContainer } from '../../libs/iocContainer/getLibContainer';
import { AddPointToRdbService } from '../service/addPointToRdb.service';

export const getWorkerContainer = () => {
  const container = new Container();

  // service
  container.bind(AddPointToRdbService).to(AddPointToRdbService);

  return Container.merge(container, getLibContainer());
};
