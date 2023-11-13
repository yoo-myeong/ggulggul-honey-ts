import dotenv from 'dotenv';
import { injectable } from 'inversify';

let envPath: string;
switch (process.env.NODE_ENV) {
  case 'local':
    envPath = './.env.api.local';
    break;
  default:
    envPath = './.env.api.production';
    break;
}

dotenv.config({ path: envPath });

class Config {
  value: unknown;

  cast = (key: string): Config => {
    this.value = process.env[key];

    if (this.value === undefined) throw new Error(`process.env.${key} is not defined`);

    return this as unknown as Config;
  };

  getParsedIntPipe = () => {
    const parsed = parseInt(this.value as string, 10);
    if (Number.isNaN(parsed)) throw new Error(`cast and parseIntPipe Error)`);
    return this.value as number;
  };

  get() {
    return this.value as string;
  }
}

const APP_PORT = new Config().cast('APP_PORT').getParsedIntPipe();

const GOOGLE_CLIENT_ID = new Config().cast('GOOGLE_CLIENT_ID').get();
const GOOGLE_CLIENT_SECRET = new Config().cast('GOOGLE_CLIENT_SECRET').get();
const GOOGLE_REDIRECT_URI = new Config().cast('GOOGLE_REDIRECT_URI').get();
const GOOGLE_TOKEN_URL = new Config().cast('GOOGLE_TOKEN_URL').get();

export { APP_PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_TOKEN_URL };
