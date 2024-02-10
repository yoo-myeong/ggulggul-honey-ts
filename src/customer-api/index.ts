/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { getApiContainer } from './config/getApiContainer';
import { MYSQL, REDIS } from '../libs/config/configContainer';
import { App } from './App';
import { TypeOrm } from '../libs/repository/TypeOrm';
import { IoRedis } from '../libs/redis/IoRedis';
import { Config } from '../libs/config/config';
import './test/test.controller';
import './mall/mall.controller';
import './ticket/raffle-ticket.controller';

export const handler = async () => {
  await TypeOrm.connect(MYSQL);
  IoRedis.connect(REDIS);

  const server = new InversifyExpressServer(getApiContainer());
  const { app } = new App(server);

  app.listen(Config.cast('APP_PORT').getParsedInt(), () => console.log('server start'));
};

handler();
