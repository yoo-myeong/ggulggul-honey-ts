import dotenv from 'dotenv';

let envPath: string;
switch (process.env.NODE_ENV) {
  case 'local':
    envPath = './.env.local';
    break;
  default:
    envPath = './.env.production';
    break;
}

dotenv.config({ path: envPath });

export const cast = (key: string) => {
  const value = process.env[key];

  if (value === undefined) throw new Error(`process.env.${key} is not defined`);

  return value;
};
