import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { UserPointCacheService } from '../../service/userPointCache.service';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const { userId } = JSON.parse(sqsEvent.Records[0].body);

  const [addPointService] = [getWorkerContainer().get(UserPointCacheService)];

  await addPointService.addPointToCache(userId);
};
