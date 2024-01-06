import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserPointModifier } from './enum/UserPointModifier';
import { UserPointLogStatus } from './enum/UserPointLogStatus';

export class UserPointLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userPointId: number;

  @Column()
  changePoint: number;

  @Column()
  remainPoint: number;

  @Column()
  modifiedBy: UserPointModifier;

  @Column()
  modifiedById: number;

  @Column()
  status: UserPointLogStatus;
}
