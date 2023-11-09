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
import { DateTimeUtil } from '../../../libs/util/DateTimeUtil';
import { Of } from '../../../libs/util/Of';

export class CreateReservedTicketReq {
  private VALID_SELL_DIFF_HOURS = 48;

  private VALID_APPLY_DIFF_HOURS_TO_SELL_DATE = 24;

  private VALID_APPLY_DIFF_HOURS_TO_NOW = 1;

  @IsString()
  @IsNotEmpty()
  @Min(20)
  explanation: string;

  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  originPrice: number;

  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  salePrice: number;

  @IsString()
  @IsNotEmpty()
  @Min(1)
  title: string;

  @IsNumber()
  @Max(5)
  @IsPositive()
  @IsInt()
  quantity: number;

  @IsString({ each: true })
  @IsOptional()
  imageUrls: string[];

  @IsDate()
  sellDate: Date;

  @IsDate()
  applyEndDate: Date;

  private validateSalePrice() {
    if (!(this.salePrice < this.originPrice)) {
      throw new Error('invalid sale price');
    }
  }

  private validateSellDate(now: Date) {
    if (DateTimeUtil.DateAddHours(now, this.VALID_SELL_DIFF_HOURS) > this.sellDate) {
      throw new Error('invalid sell date');
    }
  }

  private validateApplyEndDate(now: Date) {
    if (
      this.applyEndDate < DateTimeUtil.DateAddHours(now, this.VALID_APPLY_DIFF_HOURS_TO_NOW) ||
      this.applyEndDate > DateTimeUtil.DateSubtractHours(this.sellDate, this.VALID_APPLY_DIFF_HOURS_TO_SELL_DATE)
    ) {
      throw new Error('invalid apply end date');
    }
  }

  private validate() {
    const now = new Date();
    this.validateSalePrice();
    this.validateSellDate(now);
    this.validateApplyEndDate(now);
  }

  static create(params: {
    explanation: string;
    originPrice: number;
    salePrice: number;
    title: string;
    quantity: number;
    imageUrls: string[];
    sellDate: Date;
    applyEndDate: Date;
  }) {
    const req = Of(this, params);
    req.validate();

    return req;
  }
}
