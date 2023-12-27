import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateTimeUtil } from '../../util/DateTimeUtil';
import { of } from '../../util/of';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity()
export class ReservedTicket extends BaseTimeEntity {
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
    type: 'timestamptz',
  })
  sellDate: Date;

  @Column()
  applyEndDate: Date;

  @Column()
  raffleDate: Date;

  private setRaffleDate() {
    this.raffleDate = DateTimeUtil.DateAddHours(this.applyEndDate, this.RAFFLE_DIFF_HOURS_TO_APPLY_END);
  }

  static async create(params: ReservedTicket) {
    const reservedTicket = await of(this, params);

    reservedTicket.setRaffleDate();

    return reservedTicket;
  }
}
