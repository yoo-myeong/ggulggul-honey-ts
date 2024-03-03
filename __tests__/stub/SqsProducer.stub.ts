import { fake } from 'sinon';
import { SqsProducer } from '../../src/libs/sqs/SqsProducer';

export class SqsProducerStub extends SqsProducer {
  override async sendMessage() {
    fake.resolves(true);
  }

  override async sendString(): Promise<void> {
    fake.resolves(true);
  }
}
