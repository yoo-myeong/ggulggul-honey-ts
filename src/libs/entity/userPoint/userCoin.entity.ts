import { Column, Entity, Index } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { CoinStatus } from './enum/CoinStatus';

@Entity('user_coin')
@Index(['userId, status'])
export class UserCoinEntity extends BaseTimeEntity {
  @Column({
    type: 'int',
    unsigned: true,
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  status: CoinStatus;

  @Column({ nullable: true })
  issue_point: number;
}
