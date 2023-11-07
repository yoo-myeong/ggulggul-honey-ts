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
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeUtil } from '../../util/DateTimeUtil';
import { Of } from '../../util/Of';

@Entity()
export class ReservedSellTicket {
  private VALID_SELL_DIFF_HOURS = 48;

  private VALID_APPLY_DIFF_HOURS_TO_SELL_DATE = 24;

  private VALID_APPLY_DIFF_HOURS_TO_NOW = 1;

  private RAFFLE_DIFF_HOURS_TO_APPLY_END = 1;

  @PrimaryGeneratedColumn()
  private id: number;

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

  private raffleDate: Date;

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
    const reservedSellTicket = Of(this, params);
    reservedSellTicket.raffleDate = DateTimeUtil.DateAddHours(
      reservedSellTicket.applyEndDate,
      reservedSellTicket.RAFFLE_DIFF_HOURS_TO_APPLY_END,
    );

    reservedSellTicket.validate();

    return reservedSellTicket;
  }
}
