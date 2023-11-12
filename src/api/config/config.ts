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

@injectable()
export class Config {
  value: unknown;

  cast = (key: string): Config => {
    this.value = process.env[key];

    if (this.value === undefined) throw new Error(`process.env.${key} is not defined`);

    return this as unknown as Config;
  };

  parseIntPipe = () => {
    const parsed = parseInt(this.value as string, 10);
    if (Number.isNaN(parsed)) throw new Error(`cast and parseIntPipe Error)`);
    return this as unknown as Config;
  };

  get() {
    return this.value;
  }
}
