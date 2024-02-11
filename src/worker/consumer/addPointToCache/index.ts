import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../iocContainer/getWorkerContainer';
import { UserPointCache } from '../../../libs/cache/userPoint.cache';
import { IoRedis } from '../../../libs/redis/IoRedis';
import { TypeOrm } from '../../../libs/repository/TypeOrm';
import { MYSQL, REDIS } from '../../../libs/config/configContainer';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const records = sqsEvent.Records;
  const userIds: number[] = records.map((e) => JSON.parse(e.body).userId);

  const [userPointCache] = [getWorkerContainer().get(UserPointCache)];
  IoRedis.connect(REDIS);
  await TypeOrm.connect(MYSQL);

  await userPointCache.addPointToCache(userIds);
};
