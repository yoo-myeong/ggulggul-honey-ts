import { controller, httpGet } from 'inversify-express-utils';
import { TestService } from './test.service';
import { lazyInject } from '../config/iocContainer';

@controller('/test')
export class TestController {
  @lazyInject(TestService)
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
