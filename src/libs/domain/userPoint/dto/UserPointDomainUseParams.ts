import { IsDivisibleBy, IsNumber, IsString } from 'class-validator';

export class UserPointDomainUseParams {
  static readonly USE_POINT_DIVISIBLE_BY_VALUE = 500;

  @IsNumber()
  // eslint-disable-next-line no-use-before-define
  @IsDivisibleBy(UserPointDomainUseParams.USE_POINT_DIVISIBLE_BY_VALUE)
  changePoint: number;

  @IsString()
  modifiedBy: string;
}
