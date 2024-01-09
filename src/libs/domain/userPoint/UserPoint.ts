import { of } from '../../util/of';
import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';

export class UserPointDomain {
  private readonly MAX_USABLE_POINT = 2000;
  private readonly USE_POINT_DIVISIBLE_BY_VALUE = 500;
  private _point: number;

  static async from(params: { userPointId: number; point: number }) {
    return of(this, params);
  }

  private setPoint(changePoint: number) {
    const remainPoint = this._point + changePoint;
    if (remainPoint < 0) {
      throw new CustomError(ErrorCode.BAD_REQUEST, '포인트는 음수가 될 수 없습니다.');
    }
    this._point += changePoint;
  }

  private validateUsingPoint(changePoint: number) {
    const absChangePoint = Math.abs(changePoint);
    const isUsable =
      changePoint <= 0 &&
      changePoint % this.USE_POINT_DIVISIBLE_BY_VALUE === 0 &&
      absChangePoint <= this.MAX_USABLE_POINT;

    if (!isUsable) {
      throw new CustomError(ErrorCode.BAD_REQUEST, '포인트를 사용할 수 없습니다.');
    }
  }

  use(changePoint: number) {
    this.validateUsingPoint(changePoint);
    this.setPoint(changePoint);
  }
}
