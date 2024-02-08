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
  MinLength,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { DateTimeUtil } from '../../util/DateTimeUtil';
import { of } from '../../util/of';

export class CreateRaffleTicket {
  private VALID_SELL_DIFF_HOURS = 48;

  private VALID_APPLY_DIFF_HOURS_TO_SELL_DATE = 24;

  private VALID_APPLY_DIFF_HOURS_TO_NOW = 1;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  private explanation: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  private originPrice: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  @IsDivisibleBy(100)
  private salePrice: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  private title: string;

  @Expose()
  @IsNumber()
  @Max(5)
  @IsPositive()
  @IsInt()
  private quantity: number;

  @Expose()
  @IsString({ each: true })
  @IsOptional()
  private imageUrls: string[];

  @Expose()
  @IsDate()
  private sellDate: Date;

  @Expose()
  @IsDate()
  private applyEndDate: Date;

  private validateSalePrice() {
    if (!(this.salePrice < this.originPrice)) {
      throw new Error('invalid sale price');
    }
  }

  private validateSellDate(now: Date) {
    if (DateTimeUtil.IsAfter(DateTimeUtil.DateAddHours(now, this.VALID_SELL_DIFF_HOURS), this.sellDate)) {
      throw new Error('invalid sell date');
    }
  }

  private validateApplyEndDate(now: Date) {
    if (
      DateTimeUtil.IsAfter(DateTimeUtil.DateAddHours(now, this.VALID_APPLY_DIFF_HOURS_TO_NOW), this.applyEndDate) ||
      DateTimeUtil.IsAfter(
        this.applyEndDate,
        DateTimeUtil.DateSubtractHours(this.sellDate, this.VALID_APPLY_DIFF_HOURS_TO_SELL_DATE),
      )
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

  static async create(params: {
    explanation: string;
    originPrice: number;
    salePrice: number;
    title: string;
    quantity: number;
    imageUrls: string[];
    sellDate: Date;
    applyEndDate: Date;
  }) {
    const inst = await of(CreateRaffleTicket, params);
    inst.validate();

    return inst;
  }
}
