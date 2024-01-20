import dotenv from 'dotenv';
import path from 'path';

let envPath: string;
switch (process.env.NODE_ENV) {
  case 'local':
  case 'test':
  default:
    envPath = path.join(__dirname, '../../../.env.api.local');
    break;
}

dotenv.config({ path: envPath });

export class Config {
  constructor(private readonly value: unknown) {}

  static cast(key: string): Config {
    const value = process.env[key];

    if (value === undefined) throw new Error(`process.env.${key} is not defined`);

    return new Config(value);
  }

  getParsedInt() {
    const parsed = parseInt(this.value as string, 10);
    if (Number.isNaN(parsed)) throw new Error(`cast and parseIntPipe Error)`);
    return this.value as number;
  }

  getString() {
    return this.value as string;
  }
}
