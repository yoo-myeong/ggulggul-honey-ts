import { Expose } from 'class-transformer';
import { of } from '../../../libs/util/of';

export class AddPointParam {
  @Expose()
  userId: number;

  @Expose()
  point: number;

  @Expose()
  pointRequestId: string;

  @Expose()
  requestUrl: string;

  static from(ctx: { userId: number; point: number; pointRequestId: string; requestUrl: string }) {
    return of(this, ctx);
  }
}
