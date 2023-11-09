import { UserPointDomainUseParams } from './dto/UserPointDomainUseParams';

export class UserPointDomain {
  private readonly MAX_USABLE_POINT = 2000;

  private readonly userPointId: number;

  private point: number;

  private changePoint?: number;

  private modifiedBy?: string;

  private setPoint(changePoint: number) {
    const remainPoint = this.point + changePoint;
    if (remainPoint < 0) {
      throw new Error('가능한 포인트 사용량이 아닙니다.');
    }
    this.point += changePoint;
  }

  private validateChangePoint(changePoint: number) {
    const absChangePoint = Math.abs(changePoint);
    const isUsable = changePoint < 0 && absChangePoint <= this.MAX_USABLE_POINT && absChangePoint <= this.point;

    if (!isUsable) {
      throw new Error('포인트를 사용할 수 없습니다.');
    }
  }

  use(params: UserPointDomainUseParams) {
    const { changePoint, modifiedBy } = params;
    this.validateChangePoint(changePoint);

    this.setPoint(changePoint);
    this.modifiedBy = modifiedBy;
  }
}
