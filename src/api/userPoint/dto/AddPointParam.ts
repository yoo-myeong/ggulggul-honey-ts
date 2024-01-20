import { Expose } from 'class-transformer';
import { of } from '../../../libs/util/of';

export class AddPointParam {
  @Expose()
  userId: number;

  @Expose()
  point: number;

  @Expose()
  apiRequestId: string;

  static from(ctx: { userId: number; point: number; apiRequestId: string }) {
    return of(this, ctx);
  }
}
