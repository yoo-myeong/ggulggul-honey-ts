import { inject } from 'inversify';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';
import { AddPointParam } from './dto/AddPointParam';
import { UserPointDomain } from '../../libs/domain/userPoint/userPoint.domain';
import { UserPointLogCreatedByEnum } from '../../libs/entity/userPoint/enum/UserPointLogCreatedBy.enum';

export class UserPointService {
  constructor(
    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPoint(param: AddPointParam) {
    const [userPointSum] = await this.userPointRepository.getUserPointSum([param.userId]);
    const userPointDomain = UserPointDomain.from({ point: userPointSum.sum });
    userPointDomain.add(param.point);

    await this.userPointRepository.insert(
      userPointDomain.toUserPointLogEntity({
        userId: param.userId,
        createById: param.apiRequestId,
        createdBy: UserPointLogCreatedByEnum.API,
      }),
    );
  }
}
