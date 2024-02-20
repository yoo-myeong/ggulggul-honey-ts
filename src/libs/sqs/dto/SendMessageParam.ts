import { Message } from 'sqs-producer';

export class SendMessageParam {
  private _id: string;
  private _body: string;
  private _groupId?: string;
  private _deduplicationId?: string;

  static create(params: { id: string; body: string; groupId?: string; deduplicationId?: string }) {
    const inst = new SendMessageParam();
    inst._id = params.id;
    inst._body = params.body;
    inst._groupId = params.groupId;
    inst._deduplicationId = params.deduplicationId;

    return inst;
  }

  toSqsMessage(): Message {
    return {
      id: this._id,
      body: this._body,
      groupId: this._groupId,
      deduplicationId: this._deduplicationId,
    };
  }
}
