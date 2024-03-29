import { inject, injectable } from 'inversify';
import { In, IsNull, Not, Repository } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserCoinEntity } from '../../entity/userPoint/userCoin.entity';
import { CustomError } from '../../error/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';
import { InjectType } from '../../iocContainer/InjectType';

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

  async getUserCoinWithIssuePointByIds(ids: number[]) {
    const userCoins = await this.userCoinEntityRepository.findBy({ id: In(ids) });
    const userCoinsWithIssuePoint = userCoins.filter((e) => e.issuePoint);

    if (!userCoinsWithIssuePoint.length) throw new CustomError(ErrorCode.NOT_FOUND, `no coing by ids(${ids})`);

    return userCoinsWithIssuePoint;
  }
}
