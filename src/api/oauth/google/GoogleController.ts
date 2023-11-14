import { BaseHttpController, controller, httpGet, queryParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { GoogleTokenHttpClient } from './GoogleTokenHttpClient';
import { InjectType } from '../../config/InjectType';

@controller('/oauth/google')
export class GoogleController extends BaseHttpController {
  constructor(
    @inject(InjectType.GoogleTokenHttpClient)
    private readonly googleTokenHttpClient: GoogleTokenHttpClient,
  ) {
    super();
  }

  @httpGet('/login')
  async login(@queryParam('code') code: string) {
    console.log(code);
    const result = await this.googleTokenHttpClient.getToken(code);

    return 200;
  }
}
