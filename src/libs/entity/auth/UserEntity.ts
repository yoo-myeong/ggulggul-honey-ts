import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { UserStatus } from './enum/userStatus';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { UserRole } from './enum/userRole';

// @Entity()
export class UserEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  status: UserStatus;

  @Column()
  nickname: string;

  @Column()
  phone: string;

  @Column()
  role: UserRole;

  static signUp(ctx: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: UserStatus;
    nickname: string;
    phone: string;
    role: UserRole;
  }) {
    const user = new UserEntity();
    user.email = ctx.email;
    user.password = ctx.password;
    user.firstName = ctx.firstName;
    user.lastName = ctx.lastName;
    user.status = ctx.status;
    user.nickname = ctx.nickname;
    user.phone = ctx.phone;
    user.role = ctx.role ?? UserRole.BUYER;

    return user;
  }
}
