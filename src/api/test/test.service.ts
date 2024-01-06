import { injectable } from 'inversify';

@injectable()
export class TestService {
  getAll() {
    return 'getAll';
  }
}
