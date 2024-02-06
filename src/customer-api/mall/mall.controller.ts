import { controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { instanceToPlain } from 'class-transformer';
import { MallService } from './mall.service';
import { GetMallByIdResponse } from './dto/GetMallByIdResponse';

@controller('/malls')
export class MallController {
  constructor(
    @inject(MallService)
    private readonly mallService: MallService,
  ) {}

  @httpGet('/:id')
  async getMallById(@requestParam('id') id: string) {
    const res = await this.mallService.getById(parseInt(id, 10));
    return instanceToPlain(res);
  }
}
