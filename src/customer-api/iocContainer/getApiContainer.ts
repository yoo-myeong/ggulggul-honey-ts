import { Container } from 'inversify';
import { getLibContainer } from '../../libs/iocContainer/getLibContainer';
import { MallService } from '../mall/mall.service';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(MallService).to(MallService);

  return Container.merge(container, getLibContainer());
};
