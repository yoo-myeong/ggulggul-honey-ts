import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { of } from '../../../libs/util/of';
import { CreateRaffleTicket } from '../../../libs/domain/ticket/CreateRaffleTicket';

export interface ICreateRaffleTicketRequest {
  explanation: string;
  originPrice: number;
  salePrice: number;
  title: string;
  quantity: number;
  imageUrls: string[];
  sellDate: string;
  applyEndDate: string;
}

export class CreateRaffleTicketRequest {
  @Expose()
  @IsString()
  explanation: string;

  @Expose()
  @IsNumber()
  originPrice: number;

  @Expose()
  @IsNumber()
  salePrice: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsUrl(undefined, { each: true })
  imageUrls: string[];

  @Expose()
  @Type(() => Date)
  @IsDate()
  sellDate: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  applyEndDate: Date;

  static async transform(params: ICreateRaffleTicketRequest) {
    return of(this, params);
  }

  async toDomain() {
    return await CreateRaffleTicket.create({
      explanation: this.explanation,
      originPrice: this.originPrice,
      salePrice: this.salePrice,
      title: this.title,
      quantity: this.quantity,
      imageUrls: this.imageUrls,
      sellDate: this.sellDate,
      applyEndDate: this.applyEndDate,
    });
  }
}
