import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TestService } from './test.service';

@controller('/test')
export class TestController {
  @inject(TestService)
  private testService: TestService;

  static build(ctx: { testService: TestService }) {
    const inst = new TestController();
    inst.testService = ctx.testService;
    return inst;
  }

  @httpGet('/')
  get() {
    return this.testService.getAll();
  }
}
