import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TestService } from './test.service';

@controller('/test')
export class TestController {
  constructor(
    @inject(TestService)
    private readonly testService: TestService,
  ) {}

  @httpGet('/')
  get() {
    return this.testService.getAll();
  }
}
