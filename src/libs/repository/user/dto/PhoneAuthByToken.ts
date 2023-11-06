import { DateTimeUtil } from '../../../util/DateTimeUtil';

export class PhoneAuthByToken {
  private readonly EXPIRED_MINUTE = 5;

  private id: number;

  private certified: boolean;

  private ttl: Date;

  constructor(ctx: { id: number; certified: boolean; ttl: Date }) {
    this.id = ctx.id;
    this.certified = ctx.certified;
    this.ttl = ctx.ttl;
  }

  certify(now: Date) {
    this.certified = true;
    this.ttl = DateTimeUtil.DateAddMinute(now, this.EXPIRED_MINUTE);
  }

  isExpired(now: Date) {
    return now > this.ttl;
  }

  isCertified(now: Date) {
    return this.certified && !this.isExpired(now);
  }
}
