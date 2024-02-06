import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { getApiContainer } from '../../../src/customer-api/config/getApiContainer';
import { App } from '../../../src/customer-api/App';
import { getMySqlTypeOrmTestOption } from '../../integration/getMySqlTypeOrmTestOption';
import { TypeOrm } from '../../../src/libs/repository/TypeOrm';

import '../../../src/customer-api/test/test.controller';

describe('test', () => {
  let app: express.Application;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    const server = new InversifyExpressServer(getApiContainer());
    app = new App(server).app;
  });

  afterAll(async () => await TypeOrm.disconnect());

  it('[GET] /test', async () => {
    const res = await supertest(app).get('/test');

    expect(res.statusCode).toBe(200);
  });
});
