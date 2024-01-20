import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserPointLogEntity } from '../../entity/userPoint/userPointLog.entity';
import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { InjectType } from '../../config/InjectType';
import { of } from '../../util/of';
import { GetUserPointSumResult } from './dto/getUserPointSum.dto';

@injectable()
export class UserPointRepository {
  constructor(
    @inject(InjectType.UserPointLogEntityRepository)
    private readonly userPointLogEntityRepository: Repository<UserPointLogEntity>,
  ) {}

  async getUserPointSum(userIds: number[]) {
    const filteredDuplicateUserIds = userIds.filter((userId, idx) => userIds.indexOf(userId) === idx);

    const userPointLog = await this.userPointLogEntityRepository
      .createQueryBuilder('upl')
      .select('upl.userId', 'userId')
      .addSelect('SUM(upl.changePoint)', 'sum')
      .where('upl.userId in (:...userIds)', { userIds: filteredDuplicateUserIds })
      .getRawMany();

    if (!userPointLog.length) throw new CustomError(ErrorCode.NOT_FOUND, 'userPointLog not found');

    return userPointLog.map((e) => plainToInstance(GetUserPointSumResult, e));
  }

  async insert(entity: UserPointLogEntity) {
    return await this.userPointLogEntityRepository.insert(entity);
  }
}
