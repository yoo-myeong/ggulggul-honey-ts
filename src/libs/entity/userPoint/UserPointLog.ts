import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Unique(['userId', 'pointRequestId'])
export class UserPointLog extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    comment: 'path',
  })
  modifiedBy: string;
}
