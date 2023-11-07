import {
  IsDate,
  IsDivisibleBy,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { DateTimeUtil } from '../../../libs/util/DateTimeUtil';

export class ReservedSellTicketCmd {
  private VALID_SELL_DIFF_TIME = 48;

  private VALID_APPLY_DIFF_TIME_TO_SELL_DATE = 24;

  private VALID_APPLY_DIFF_TIME_TO_NOW = 1;

  private RAFFLE_DIFF_TIME_TO_APPLY_END = 1;

  @IsString()
  @IsNotEmpty()
  @Min(20)
  private explanation: string;

  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  private originPrice: number;

  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  private salePrice: number;

  @IsString()
  @IsNotEmpty()
  @Min(1)
  private title: string;

  @IsNumber()
  @Max(5)
  @IsPositive()
  @IsInt()
  private quantity: number;

  @IsString({ each: true })
  @IsOptional()
  private imageUrls: string[];

  @IsDate()
  private sellDate: Date;

  @IsDate()
  private applyEndDate: Date;

  @Expose()
  get raffleDate() {
    return DateTimeUtil.DateAddHours(this.applyEndDate, this.RAFFLE_DIFF_TIME_TO_APPLY_END);
  }

  private validateSalePrice() {
    if (!(this.salePrice < this.originPrice)) {
      throw new Error('invalid sale price');
    }
  }

  private validateSellDate(now: Date) {
    if (DateTimeUtil.DateAddHours(now, this.VALID_SELL_DIFF_TIME) > this.sellDate) {
      throw new Error('invalid sell date');
    }
  }

  private validateApplyEndDate(now: Date) {
    if (
      this.applyEndDate < DateTimeUtil.DateAddHours(now, this.VALID_APPLY_DIFF_TIME_TO_NOW) ||
      this.applyEndDate > DateTimeUtil.DateSubtractHours(this.sellDate, this.VALID_APPLY_DIFF_TIME_TO_SELL_DATE)
    ) {
      throw new Error('invalid apply end date');
    }
  }

  public validate() {
    const now = new Date();
    this.validateSalePrice();
    this.validateSellDate(now);
    this.validateApplyEndDate(now);
  }
}
