import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { AddPointToRedisService } from '../../service/addPointToRedis.service';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const { coinId } = JSON.parse(sqsEvent.Records[0].body);

  const [addPointService] = [getWorkerContainer().get(AddPointToRedisService)];

  await addPointService.addPointToRedis();
};
