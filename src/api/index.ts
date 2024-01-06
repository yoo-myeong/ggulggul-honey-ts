/* eslint-disable import/no-unresolved */

import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import serverless from 'serverless-http';
import { errorHandler } from './filter/errorHandler';
import { container } from './config/iocContainer';

import './test/test.controller';
import { TypeOrm } from '../libs/repository/TypeOrm';
import { MYSQL } from './config/configContainer';

const server = new InversifyExpressServer(container);
server
  .setConfig(async (app) => {
    await TypeOrm.connect(MYSQL);
    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((app) => {
    app.use(errorHandler);
  });

const app = server.build();

export const handler = serverless(app);
