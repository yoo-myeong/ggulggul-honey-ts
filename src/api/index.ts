/* eslint-disable import/no-unresolved */

import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import serverless from 'serverless-http';
import { errorHandler } from './filter/errorHandler';
import { container } from './config/iocContainer';
import './mall/mall.controller';

const server = new InversifyExpressServer(container);
server
  .setConfig(async (app) => {
    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((app) => {
    app.use(errorHandler);
  });

const app = server.build();

export const handler = serverless(app);
