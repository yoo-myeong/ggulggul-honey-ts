import { inject, injectable } from 'inversify';
import { IsNull, Repository } from 'typeorm';
import { TypeOrm } from '../TypeOrm';
import { UserCoinEntity } from '../../entity/userPoint/userCoin.entity';
import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { InjectType } from '../../config/InjectType';

@injectable()
export class UserCoinRepository {
  constructor(
    @inject(InjectType.UserCoinEntityRepository)
    private readonly userCoinEntityRepository: Repository<UserCoinEntity>,
  ) {}

  async getUsableOneAndCountAllByUserId(userId: number) {
    const [coin, count] = await Promise.all([
      this.userCoinEntityRepository.findOneBy({ userId, issuePoint: IsNull() }),
      this.userCoinEntityRepository.countBy({ userId }),
    ]);
    if (!coin) throw new CustomError(ErrorCode.BAD_REQUEST, `no coin by userId (${userId})`);

    return {
      coin,
      count,
    };
  }

  async updateIssuePoint(id: number, point: number) {
    return await this.userCoinEntityRepository.update({ id }, { issuePoint: point });
  }
}
