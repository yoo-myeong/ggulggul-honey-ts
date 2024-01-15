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
  issuePoint: number;

  static create(ctx: { userId: number }) {
    const inst = new UserCoinEntity();
    inst.userId = ctx.userId;

    return inst;
  }
}
