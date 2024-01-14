import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { UserPointLogEntity } from '../../entity/userPoint/userPointLog.entity';

export class UserPointDomain {
  private readonly MIN_USABLE_POINT = 1000;
  private readonly MAX_USABLE_POINT = 2000;
  private readonly MAX_ADDABLE_POINT = 2000;
  private readonly USE_POINT_DIVISIBLE_BY_VALUE = 500;
  private readonly ADD_POINT_DIVISIBLE_BY_VALUE = 100;
  private _point: number;
  private _changPoint = 0;

  static from(params: { point: number }) {
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
    this._changPoint += changePoint;
  }

  private validateUsingPoint(usingPoint: number) {
    const absUsingPoint = Math.abs(usingPoint);
    const isUsable =
      usingPoint <= 0 &&
      usingPoint % this.USE_POINT_DIVISIBLE_BY_VALUE === 0 &&
      absUsingPoint <= this.MAX_USABLE_POINT &&
      absUsingPoint >= this.MIN_USABLE_POINT;

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

  toUserPointLogEntity(params: { userId: number; pointRequestId: string; modifiedBy: string }) {
    const entity = new UserPointLogEntity();
    entity.userId = params.userId;
    entity.pointRequestId = params.pointRequestId;
    entity.modifiedBy = params.modifiedBy;
    entity.changePoint = this._changPoint;

    return entity;
  }
}
