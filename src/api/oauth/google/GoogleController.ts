import { BaseHttpController, controller, httpGet, queryParam } from 'inversify-express-utils';

@controller('/oauth/google')
export class GoogleController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('/login')
  async login(@queryParam('code') code: string) {
    return code;
  }
}
