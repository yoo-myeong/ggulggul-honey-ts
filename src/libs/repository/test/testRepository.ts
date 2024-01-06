import { injectable } from 'inversify';

@injectable()
export class TestRepository {
  getAll() {
    return 'getAll';
  }
}
