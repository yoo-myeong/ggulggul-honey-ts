import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { MallService } from '../mall/mall.service';
import { MallEntity } from '../../libs/entity/mall/mall.entity';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(TestService).to(TestService);
  container.bind(MallService).to(MallService);

  return Container.merge(container, getLibContainer());
};
