/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import serverless from 'serverless-http';
import { getApiContainer } from './config/getApiContainer';
import { MYSQL } from './config/configContainer';
import { App } from './App';

import './test/test.controller';
import { TypeOrm } from '../libs/repository/TypeOrm';

export const handler = async (event: never, context: never) => {
  await TypeOrm.connect(MYSQL);

  const server = new InversifyExpressServer(getApiContainer());
  const { app } = new App(server);

  return serverless(app)(event, context);
};
