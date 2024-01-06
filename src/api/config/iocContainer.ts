import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { TestService } from '../test/test.service';

export const container = new Container();
export const { lazyInject } = getDecorators(container);

// service
container.bind(TestService).to(TestService);

// respository
