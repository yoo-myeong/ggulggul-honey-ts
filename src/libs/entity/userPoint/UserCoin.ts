import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserCoinUsedBy } from './enum/UserCoinUsedBy';
import { UserCoinCreatedBy } from './enum/UserCoinCreatedBy';

export class UserCoin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  createdBy: UserCoinCreatedBy;

  @Column()
  usedAt?: Date;

  @Column()
  usedBy?: UserCoinUsedBy;
}
