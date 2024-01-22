import { Expose } from 'class-transformer';
import { of } from '../../../libs/util/of';

export class AddPointParam {
  @Expose()
  userId: number;

  @Expose()
  point: number;

  @Expose()
  createdById: string;

  static from(ctx: { userId: number; point: number; createdById: string }) {
    return of(this, ctx);
  }
}
