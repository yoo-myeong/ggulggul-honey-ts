import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';
import { BaseHttpClient } from '../../../libs/http/BaseHttpClient';
import { GOOGLE } from '../../config/configContainer';

@injectable()
export class GoogleTokenHttpClient extends BaseHttpClient {
  constructor() {
    super({
      baseUrl: GOOGLE.GOOGLE_TOKEN_URL,
    });
  }

  async getToken(code: string) {
    let result: AxiosResponse;
    try {
      result = await this.post<{ token: string }>({
        url: '',
        body: {
          code,
          client_id: GOOGLE.GOOGLE_CLIENT_ID,
          client_secret: GOOGLE.GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        config: {
          headers: {
            // 'Content-Type': 'x-www-form-urlencoded',
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
    return result.data.token;
  }
}
