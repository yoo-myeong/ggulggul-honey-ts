import { Column, Entity, Unique } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity('user_point_log')
@Unique(['userId', 'pointRequestId'])
export class UserPointLogEntity extends BaseTimeEntity {
  @Column({
    type: 'bigint',
  })
  userId: number;

  @Column({
    type: 'char',
    length: 36,
    comment: '포인트 변경 중복처리 방지 id',
  })
  pointRequestId: string;

  @Column({
    type: 'int',
  })
  changePoint: number;

  @Column({
    type: 'varchar',
    comment: 'changing url path',
  })
  modifiedBy: string;
}
