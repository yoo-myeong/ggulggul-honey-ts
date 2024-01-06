import { injectable } from 'inversify';
import { TestEntity } from '../../entity/test/test.entity';
import { TypeOrm } from '../TypeOrm';

@injectable()
export class TestCustomRepository {
  constructor(private readonly testRepository = TypeOrm.getRepository(TestEntity)) {}

  getAll() {
    return this.testRepository.find();
  }
}
