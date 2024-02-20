import { injectable } from 'inversify';
import { Producer } from 'sqs-producer';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Config } from '../config/config';
import { SendMessageParam } from './dto/SendMessageParam';

@injectable()
export class SqsProducer {
  private readonly producer = Producer.create({
    queueUrl: Config.cast('SQS_URL').getString(),
    region: Config.cast('SQS_REGION').getString(),
    sqs: new SQSClient({
      region: Config.cast('SQS_REGION').getString(),
      credentials: {
        accessKeyId: Config.cast('SQS_ACCESS_KEY').getString(),
        secretAccessKey: Config.cast('SQS_SECRET_ACCESS_KEY').getString(),
      },
    }),
  });

  public async sendMessage(params: SendMessageParam[]) {
    await this.producer.send(params.map((e) => e.toSqsMessage()));
  }

  public async sendString(params: string[]) {
    await this.producer.send(params);
  }
}
