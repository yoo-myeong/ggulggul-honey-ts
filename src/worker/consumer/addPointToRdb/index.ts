import 'reflect-metadata';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { getWorkerContainer } from '../../config/getWorkerContainer';
import { AddPointToRdbService } from '../../service/addPointToRdb.service';

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
  const records = sqsEvent.Records;
  const coinIds: number[] = records.map((e) => JSON.parse(e.body).coinIds);

  const [addPointToRdbService] = [getWorkerContainer().get(AddPointToRdbService)];

  await addPointToRdbService.addPointByCoinIds(coinIds);
};
