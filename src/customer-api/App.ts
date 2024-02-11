import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { apiErrorHandler } from '../libs/error/filter/apiErrorHandler';

export class App {
  constructor(private readonly server: InversifyExpressServer) {
    server
      .setConfig(async (app) => {
        this.setMiddleWare(app);
      })
      .setErrorConfig((app) => {
        this.setErrorHandler(app);
      });
  }

  get app() {
    return this.server.build();
  }

  private setMiddleWare(app: express.Application) {
    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private setErrorHandler(app: express.Application) {
    app.use(apiErrorHandler);
  }
}
