import { inject, injectable } from 'inversify';
import { TestRepository } from '../../libs/repository/test/testRepository';

@injectable()
export class TestService {
  @inject(TestRepository)
  private testRepository: TestRepository;

  getAll() {
    return this.testRepository.getAll();
  }
}
