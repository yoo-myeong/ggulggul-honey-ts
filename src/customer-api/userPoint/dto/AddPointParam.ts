import { Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { of } from '../../../libs/util/of';

export class AddPointParam {
  @Expose()
  @IsNumber()
  @IsPositive()
  userId: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  point: number;

  @Expose()
  @IsString()
  createdById: string;

  static from(ctx: { userId: number; point: number; createdById: string }) {
    return of(this, ctx);
  }
}
