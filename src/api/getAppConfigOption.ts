import express from 'express';

export function getAppConfigOption(app: express.Application) {
  app.set('trust proxy', true);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}
