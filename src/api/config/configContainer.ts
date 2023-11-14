import { Config } from './config';

const APP_PORT = Config.cast('APP_PORT').getParsedInt();
export const APP = {
  APP_PORT,
};

const GOOGLE_CLIENT_ID = Config.cast('GOOGLE_CLIENT_ID').getString();
const GOOGLE_CLIENT_SECRET = Config.cast('GOOGLE_CLIENT_SECRET').getString();
const GOOGLE_REDIRECT_URI = Config.cast('GOOGLE_REDIRECT_URI').getString();
const GOOGLE_TOKEN_URL = Config.cast('GOOGLE_TOKEN_URL').getString();
export const GOOGLE = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_TOKEN_URL,
};
