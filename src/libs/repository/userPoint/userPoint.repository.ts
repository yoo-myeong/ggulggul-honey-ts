import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserPointLogEntity } from '../../entity/userPoint/userPointLog.entity';
import { CustomError } from '../../error/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { InjectType } from '../../iocContainer/InjectType';
import { GetUserPointSumResult } from './dto/getUserPointSum.dto';

@injectable()
export class UserPointRepository {
  constructor(
    @inject(InjectType.UserPointLogEntityRepository)
    private readonly userPointLogEntityRepository: Repository<UserPointLogEntity>,
  ) {}

  async getUserPointSumByUserIds(userIds: number[]) {
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

  async shouldNotExistPointLogByCreatedById(createdById: string) {
    const exist = await this.userPointLogEntityRepository.exist({
      where: {
        createdById,
      },
    });

    if (exist) throw new CustomError(ErrorCode.DUPLICATED, `already exist point log by createdById(${createdById})`);
  }

  async insert(entity: UserPointLogEntity) {
    return await this.userPointLogEntityRepository.insert(entity);
  }

  async bulkInsert(entities: UserPointLogEntity[]) {
    return await this.userPointLogEntityRepository.insert(entities);
  }
}
