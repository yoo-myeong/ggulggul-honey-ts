import { BaseHttpClient } from '../../../libs/http/BaseHttpClient';
import { GOOGLE_TOKEN_URL } from '../../config/config';

export class GoogleTokenHttpClient extends BaseHttpClient {
  constructor() {
    super({
      baseUrl: GOOGLE_TOKEN_URL,
    });
  }
}
