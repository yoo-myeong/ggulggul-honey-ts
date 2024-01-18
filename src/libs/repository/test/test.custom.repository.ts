import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TestEntity } from '../../entity/test/test.entity';
import { TypeOrm } from '../TypeOrm';
import { InjectType } from '../../config/InjectType';

@injectable()
export class TestCustomRepository {
  constructor(
    @inject(InjectType.TestEntityRepository)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  getAll() {
    return this.testRepository.find();
  }
}
