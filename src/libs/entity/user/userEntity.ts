import { UserStatus } from './enum/userStatus';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { UserRole } from './enum/userRole';

export class UserEntity extends BaseTimeEntity {
  id: number;

  email: string;

  password: string;

  firstName: string;

  lastName: string;

  status: UserStatus;

  nickname: string;

  phone: string;

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
