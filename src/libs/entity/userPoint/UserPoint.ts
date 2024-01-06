import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['userId'])
export class UserPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  point: number;
}
