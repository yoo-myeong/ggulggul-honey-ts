import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import supertest from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../../integration/getMySqlTypeOrmTestOption';
import { getApiContainer } from '../../../../src/customer-api/iocContainer/getApiContainer';
import { App } from '../../../../src/customer-api/App';
import { MallEntity } from '../../../../src/libs/entity/mall/mall.entity';

import '../../../../src/customer-api/mall/mall.controller';
import { GetMallByIdResponse } from '../../../../src/customer-api/mall/dto/GetMallByIdResponse';

describe('/malls', () => {
  let app: express.Application;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    const server = new InversifyExpressServer(getApiContainer());
    app = new App(server).app;
  });

  afterAll(async () => await TypeOrm.disconnect());

  it('[GET] /malls', async () => {
    const mallEntityRepository = TypeOrm.getRepository<MallEntity>(MallEntity);
    const mall = new MallEntity();
    mall.address = '서울 강남구 대치동';
    mall.phone = '02-123-456';
    const savedMall = await mallEntityRepository.save(mall);

    const res = await supertest(app).get(`/malls/${savedMall.id}`);

    expect(res.body).toEqual(
      instanceToPlain(
        GetMallByIdResponse.of({
          address: savedMall.address,
          phone: savedMall.phone,
        }),
      ),
    );
  });
});
