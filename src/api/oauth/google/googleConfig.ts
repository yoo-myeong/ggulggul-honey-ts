import { inject, injectable } from 'inversify';
import { Config } from '../../config/config';
import { InjectType } from '../../config/InjectType';

@injectable()
export class GoogleConfig {
  constructor(
    @inject(InjectType.Config)
    private readonly config: Config,
  ) {}

  get clientId() {
    return this.config.cast('GOOGLE_CLIENT_ID').get();
  }

  get clientSecret() {
    return this.config.cast('GOOGLE_CLIENT_SECRET').get();
  }

  get redirectUri() {
    return this.config.cast('GOOGLE_REDIRECT_URI').get();
  }
}
