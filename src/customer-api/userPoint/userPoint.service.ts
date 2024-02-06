import { inject } from 'inversify';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';
import { AddPointParam } from './dto/AddPointParam';
import { UserPointDomain } from '../../libs/domain/userPoint/userPoint.domain';
import { UserPointLogCreatedByEnum } from '../../libs/entity/userPoint/enum/UserPointLogCreatedBy.enum';
import { CustomError } from '../filter/CustomError';
import { ErrorCode } from '../../libs/error/errorCode';
import { UsePointParam } from './dto/UsePointParam';

export class UserPointService {
  constructor(
    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPoint(param: AddPointParam) {
    const [[userPoint]] = await Promise.all([
      this.userPointRepository.getUserPointSumByUserIds([param.userId]),
      this.userPointRepository.shouldNotExistPointLogByCreatedById(param.createdById),
    ]);

    const userPointDomain = UserPointDomain.from({ point: userPoint.sum });
    userPointDomain.add(param.point);

    await this.userPointRepository.insert(
      userPointDomain.toUserPointLogEntity({
        userId: param.userId,
        createById: param.createdById,
        createdBy: UserPointLogCreatedByEnum.API,
      }),
    );
  }

  async usePoint(param: UsePointParam) {
    const [[point]] = await Promise.all([
      this.userPointRepository.getUserPointSumByUserIds([param.userId]),
      this.userPointRepository.shouldNotExistPointLogByCreatedById(param.createdById),
    ]);

    const userPointDomain = UserPointDomain.from({ point: point.sum });
    userPointDomain.use(param.point);

    await this.userPointRepository.insert(
      userPointDomain.toUserPointLogEntity({
        userId: param.userId,
        createById: param.createdById,
        createdBy: UserPointLogCreatedByEnum.API,
      }),
    );
  }
}
