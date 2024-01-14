import { Column, Entity } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity({ name: 'mall' })
export class MallEntity extends BaseTimeEntity {
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
