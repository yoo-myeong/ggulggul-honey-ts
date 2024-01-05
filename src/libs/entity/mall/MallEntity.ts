import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity({ name: 'mall' })
export class MallEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 250,
  })
  phone: string;
}
