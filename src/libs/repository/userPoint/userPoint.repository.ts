import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TypeOrm } from '../TypeOrm';
import { UserPointLogEntity } from '../../entity/userPoint/userPointLog.entity';
import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { UserPointDomain } from '../../domain/userPoint/userPoint.domain';
import { InjectType } from '../../config/InjectType';

@injectable()
export class UserPointRepository {
  constructor(
    @inject(InjectType.UserPointLogEntityRepository)
    private readonly userPointLogEntityRepository: Repository<UserPointLogEntity>,
  ) {}

  async getUserPointSum(userId: number) {
    interface queryResult {
      sum: number;
    }
    const userPointLog = await this.userPointLogEntityRepository
      .createQueryBuilder('upl')
      .select('SUM(upl.change_point)', 'sum')
      .where('upl.user_id = :userId', { userId })
      .getRawOne<queryResult>();

    if (!userPointLog) throw new CustomError(ErrorCode.NOT_FOUND, 'userPointLog not found');

    return userPointLog.sum;
  }

  async insert(entity: UserPointLogEntity) {
    return await this.userPointLogEntityRepository.insert(entity);
  }
}
