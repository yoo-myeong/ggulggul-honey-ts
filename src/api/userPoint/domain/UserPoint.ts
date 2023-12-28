import { UserPointDomainUseParams } from './dto/UserPointDomainUseParams';
import { of } from '../../../libs/util/of';
import { CustomError } from '../../filter/CustomError';
import { ErrorCode } from '../../../libs/error/errorCode';

export class UserPointDomain {
  private readonly MAX_USABLE_POINT = 2000;
  private readonly _userPointId: number;
  private _point: number;
  private _changePoint?: number;
  private _modifiedBy?: string;

  static async from(params: { userPointId: number; point: number }) {
    return of(this, params);
  }

  private setPointBy(changePoint: number, modifiedBy: string) {
    const remainPoint = this._point + changePoint;
    if (remainPoint < 0) {
      throw new CustomError(ErrorCode.BAD_REQUEST, '포인트는 음수가 될 수 없습니다.');
    }
    this._point += changePoint;
    this._changePoint = changePoint;
    this._modifiedBy = modifiedBy;
  }

  private validateChangePoint(changePoint: number) {
    const absChangePoint = Math.abs(changePoint);
    const isUsable = changePoint < 0 && absChangePoint <= this.MAX_USABLE_POINT && absChangePoint <= this._point;

    if (!isUsable) {
      throw new CustomError(ErrorCode.BAD_REQUEST, '포인트를 사용할 수 없습니다.');
    }
  }

  use(params: UserPointDomainUseParams) {
    const { changePoint, modifiedBy } = params;
    this.validateChangePoint(changePoint);

    this.setPointBy(changePoint, modifiedBy);
  }
}
