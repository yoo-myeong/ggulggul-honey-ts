import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { MallCustomRepository } from '../../libs/repository/mall/mall.repository';
import { TestService } from '../test/test.service';

export const container = new Container();
export const { lazyInject } = getDecorators(container);

// service
container.bind(TestService).to(TestService);

// respository
container.bind(MallCustomRepository).to(MallCustomRepository);
