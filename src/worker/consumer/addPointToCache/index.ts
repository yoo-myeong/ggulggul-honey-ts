import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { UserPointCache } from '../../../libs/cache/userPoint.cache';
import { IoRedis } from '../../../libs/redis/IoRedis';
import { TypeOrm } from '../../../libs/repository/TypeOrm';
import { MYSQL, REDIS } from '../../../libs/config/configContainer';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const { userId } = JSON.parse(sqsEvent.Records[0].body);

  const [userPointCacheService] = [getWorkerContainer().get(UserPointCache)];
  IoRedis.connect(REDIS);
  await TypeOrm.connect(MYSQL);

  await userPointCacheService.addPointToCache(userId);
};
