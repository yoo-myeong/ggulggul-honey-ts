import { Entity } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity()
export class TestEntity extends BaseTimeEntity {}
