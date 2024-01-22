import { inject } from 'inversify';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';
import { AddPointParam } from './dto/AddPointParam';
import { UserPointDomain } from '../../libs/domain/userPoint/userPoint.domain';
import { UserPointLogCreatedByEnum } from '../../libs/entity/userPoint/enum/UserPointLogCreatedBy.enum';
import { CustomError } from '../filter/CustomError';
import { ErrorCode } from '../../libs/error/errorCode';

export class UserPointService {
  constructor(
    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPoint(param: AddPointParam) {
    const [[userPointSum], exist] = await Promise.all([
      this.userPointRepository.getUserPointSumByUserIds([param.userId]),
      this.userPointRepository.existPointLogByCreatedById(param.createdById),
    ]);

    if (exist)
      throw new CustomError(ErrorCode.DUPLICATED, `already exist point log by createdById(${param.createdById})`);

    const userPointDomain = UserPointDomain.from({ point: userPointSum.sum });
    userPointDomain.add(param.point);

    await this.userPointRepository.insert(
      userPointDomain.toUserPointLogEntity({
        userId: param.userId,
        createById: param.createdById,
        createdBy: UserPointLogCreatedByEnum.API,
      }),
    );
  }
}
