import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { errorHandler } from './filter/errorHandler';
import { Config } from './config/config';

const container = new Container();

// container.bind<FooService>('FooService').to(FooService);

const server = new InversifyExpressServer(container);
server
  .setConfig(async (app) => {
    await require('./auth/kakao/kakaoController');

    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .setErrorConfig((app) => {
    app.use(errorHandler);
  });

const app = server.build();
const port = new Config().cast('APP_PORT').parseIntPipe().get();
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on ${port}`);
});
