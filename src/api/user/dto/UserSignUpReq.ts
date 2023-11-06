import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from '../../../libs/entity/user/userEntity';
import { UserStatus } from '../../../libs/entity/user/enum/userStatus';
import { PhoneAuthByToken } from '../../../libs/repository/user/dto/PhoneAuthByToken';
import { UserRole } from '../../../libs/entity/user/enum/userRole';

export class UserSignUpReq {
  @IsEmail()
  private email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/)
  private password: string;

  @IsString()
  @Matches(/([^가-힣\x20])/)
  private firstName: string;

  @IsString()
  @Matches(/([^가-힣\x20])/)
  private lastName: string;

  @IsEnum(UserStatus)
  private status: string;

  @Matches(/^[0-9]{3}-+[0-9]{4}-+[0-9]{4}$/)
  private phone: string;

  private checkSignupAble(phoneAuth: PhoneAuthByToken) {
    return phoneAuth.isCertified(new Date());
  }

  public signup(params: { phoneAuth: PhoneAuthByToken; nickname: string; status: UserStatus; role: UserRole }) {
    const { phoneAuth, nickname, status, role } = params;
    this.checkSignupAble(phoneAuth);

    const user = UserEntity.signUp({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      status,
      nickname,
      phone: this.phone,
      role,
    });

    return user;
  }
}
