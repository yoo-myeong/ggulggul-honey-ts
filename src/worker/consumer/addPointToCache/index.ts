import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { UserPointCacheService } from '../../service/userPointCache.service';
import { IoRedis } from '../../../libs/redis/IoRedis';
import { TypeOrm } from '../../../libs/repository/TypeOrm';
import { MYSQL, REDIS } from '../../../libs/config/configContainer';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const { userId } = JSON.parse(sqsEvent.Records[0].body);

  const [addPointService] = [getWorkerContainer().get(UserPointCacheService)];
  IoRedis.connect(REDIS);
  await TypeOrm.connect(MYSQL);

  await addPointService.addPointToCache(userId);
};
