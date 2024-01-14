import { Column } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { CoinStatus } from './enum/CoinStatus';

export class UserCoinEntity extends BaseTimeEntity {
  @Column({
    type: 'bigint',
  })
  userId: number;

  @Column()
  status: CoinStatus;

  @Column({ nullable: true })
  issue_point: number;
}
