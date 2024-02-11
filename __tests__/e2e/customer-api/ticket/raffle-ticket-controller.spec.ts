import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../../integration/getMySqlTypeOrmTestOption';
import { getApiContainer } from '../../../../src/customer-api/iocContainer/getApiContainer';
import { App } from '../../../../src/customer-api/App';
import '../../../../src/customer-api/ticket/raffle-ticket.controller';
import { DateTimeUtil } from '../../../../src/libs/util/DateTimeUtil';

describe('/raffle-ticket', () => {
  let app: express.Application;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    const server = new InversifyExpressServer(getApiContainer());
    app = new App(server).app;
  });

  afterAll(async () => await TypeOrm.disconnect());

  it('[POST] /raffle-ticket', async () => {
    const targetDate = new Date();
    const raffleTicketParam = {
      explanation: 'explanation explanation explanation',
      originPrice: 500,
      salePrice: 400,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['https://google.com', 'https://naver.com'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 49),
      applyEndDate: DateTimeUtil.DateAddHours(targetDate, 2),
    };

    const res = await supertest(app).post('/raffle-ticket').send(raffleTicketParam);

    expect(res.statusCode).toBe(201);
  });
});
