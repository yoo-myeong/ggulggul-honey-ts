import { inject, injectable } from 'inversify';
import { TestCustomRepository } from '../../libs/repository/test/test.custom.repository';

@injectable()
export class TestService {
  @inject(TestCustomRepository)
  private testRepository: TestCustomRepository;

  getAll() {
    return this.testRepository.getAll();
  }
}
