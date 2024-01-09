import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';

export class UserPointDomain {
  private readonly MAX_USABLE_POINT = 2000;
  private readonly MAX_ADDABLE_POINT = 2000;
  private readonly USE_POINT_DIVISIBLE_BY_VALUE = 500;
  private readonly ADD_POINT_DIVISIBLE_BY_VALUE = 100;
  private _point: number;

  static async from(params: { point: number }) {
    const inst = new UserPointDomain();
    inst._point = params.point;

    return inst;
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
    const usingPoint = -changePoint;
    this.validateUsingPoint(usingPoint);
    this.setPoint(usingPoint);

    return this._point;
  }

  private validateAddingPoint(changePoint: number) {
    const isAddable =
      changePoint > 0 && changePoint % this.ADD_POINT_DIVISIBLE_BY_VALUE === 0 && changePoint <= this.MAX_ADDABLE_POINT;

    if (!isAddable) {
      throw new CustomError(ErrorCode.BAD_REQUEST, '충전할 수 없는 포인트입니다.');
    }
  }

  add(changePoint: number) {
    const addingPoint = changePoint;

    this.validateAddingPoint(addingPoint);
    this.setPoint(addingPoint);

    return this._point;
  }
}
