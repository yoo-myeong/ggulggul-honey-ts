import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['userId'])
@Entity()
export class UserPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  point: number;
}
