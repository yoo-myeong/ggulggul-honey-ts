import { Config } from '../../../libs/config/config';

const isLocalOrTestEnv = () => !!(Config.cast('NODE_ENV').getString() === 'local' || 'test');

export const REDIS = {
  host: Config.cast('REDIS_HOST').getString(),
  port: Config.cast('REDIS_PORT').getParsedInt(),
  username: isLocalOrTestEnv() ? Config.cast('REDIS_USERNAME').getString() : undefined,
  password: isLocalOrTestEnv() ? Config.cast('REDIS_PASSWORD').getString() : undefined,
};
