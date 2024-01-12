import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { getContainer } from '../../../src/api/config/iocContainer';
import { App } from '../../../src/api/App';
import { getMySqlTypeOrmTestOption } from '../../integration/getMySqlTypeOrmTestOption';
import { TypeOrm } from '../../../src/libs/repository/TypeOrm';

import '../../../src/api/test/test.controller';

describe('test', () => {
  let app: express.Application;

  beforeAll(async () => {
    const server = new InversifyExpressServer(getContainer());
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    app = new App(server).app;
  });

  it('[GET] /test', async () => {
    const res = await supertest(app).get('/test');

    expect(res.statusCode).toBe(200);
  });
});
