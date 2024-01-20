import { Column, Entity, Index } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity('user_coin')
@Index(['userId'])
export class UserCoinEntity extends BaseTimeEntity {
  @Column({
    type: 'int',
    unsigned: true,
  })
  userId: number;

  @Column({ nullable: true })
  issuePoint?: number;

  static create(ctx: { userId: number; issuePoint?: number }) {
    const inst = new UserCoinEntity();
    inst.userId = ctx.userId;
    inst.issuePoint = ctx.issuePoint;

    return inst;
  }
}
