import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { UserPointRepository } from '../../../libs/repository/userPoint/userPoint.repository';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const { coinId } = JSON.parse(sqsEvent.Records[0].body);

  const [addPointService] = [getWorkerContainer().get(UserPointRepository)];
};
