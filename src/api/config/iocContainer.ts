import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { TestRepository } from '../../libs/repository/test/testRepository';

export const container = new Container();

// service
container.bind(TestService).to(TestService);

// respository
container.bind(TestRepository).to(TestRepository);
