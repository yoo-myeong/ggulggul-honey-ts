import { Column, Entity } from 'typeorm';
import { DateTimeUtil } from '../../util/DateTimeUtil';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity('raffle_ticket')
export class RaffleTicketEntity extends BaseTimeEntity {
  private RAFFLE_DIFF_HOURS_TO_APPLY_END = 1;

  @Column({
    type: 'varchar',
    length: 500,
  })
  explanation: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  originPrice: number;

  @Column({
    type: 'int',
    unsigned: true,
  })
  salePrice: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  @Column({
    type: 'json',
  })
  imageUrls: string[];

  @Column({
    type: 'timestamp',
  })
  sellDate: Date;

  @Column()
  applyEndDate: Date;

  @Column()
  raffleDate: Date;

  private setRaffleDate() {
    this.raffleDate = DateTimeUtil.DateAddHours(this.applyEndDate, this.RAFFLE_DIFF_HOURS_TO_APPLY_END);
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
    raffleDate: Date;
  }) {
    const inst = new RaffleTicketEntity();
    inst.explanation = params.explanation;
    inst.originPrice = params.originPrice;
    inst.salePrice = params.salePrice;
    inst.title = params.title;
    inst.quantity = params.quantity;
    inst.imageUrls = params.imageUrls;
    inst.sellDate = params.sellDate;
    inst.applyEndDate = params.applyEndDate;
    inst.raffleDate = params.raffleDate;

    inst.setRaffleDate();

    return inst;
  }
}
