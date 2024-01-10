import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from './config';

const APP_PORT = Config.cast('APP_PORT').getParsedInt();
export const APP = {
  APP_PORT,
};

export const GOOGLE = {
  GOOGLE_CLIENT_ID: Config.cast('GOOGLE_CLIENT_ID').getString(),
  GOOGLE_CLIENT_SECRET: Config.cast('GOOGLE_CLIENT_SECRET').getString(),
  GOOGLE_REDIRECT_URI: Config.cast('GOOGLE_REDIRECT_URI').getString(),
  GOOGLE_TOKEN_URL: Config.cast('GOOGLE_TOKEN_URL').getString(),
};

export const MYSQL = {
  type: 'mysql',
  host: Config.cast('MYSQL_HOST').getString(),
  port: Config.cast('MYSQL_PORT').getParsedInt(),
  username: Config.cast('MYSQL_USERNAME').getString(),
  password: Config.cast('MYSQL_PASSWORD').getString(),
  database: Config.cast('MYSQL_DATABASE').getString(),
  autoLoadEntities: true,
  synchronize: !!(Config.cast('NODE_ENV').getString() === 'local' || 'test'),
  logging: !!(Config.cast('NODE_ENV').getString() === 'local' || 'test'),
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    decimalNumbers: true,
  },
};
