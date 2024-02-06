import { Column, Entity, Unique } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { UserPointLogCreatedByEnum } from './enum/UserPointLogCreatedBy.enum';

@Entity('user_point_log')
@Unique(['createdBy', 'createdById'])
export class UserPointLogEntity extends BaseTimeEntity {
  @Column({
    type: 'int',
    unsigned: true,
  })
  userId: number;

  @Column({
    type: 'int',
  })
  changePoint: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '포인트 로그 생성 주체',
  })
  createdBy: UserPointLogCreatedByEnum;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '포인트 로그 생성 주체 식별자 ex) sqs message identifier, unique customer-customer-customer-api request id',
  })
  createdById: string;

  static create(ctx: {
    userId: number;
    changePoint: number;
    createdBy: UserPointLogCreatedByEnum;
    createdById: string;
  }) {
    return plainToInstance(this, ctx);
  }
}
