import { inject, injectable } from 'inversify';
import { UserCoinRepository } from '../../libs/repository/userPoint/userCoin.repository';
import { UserPointRepository } from '../../libs/repository/userPoint/userPoint.repository';
import { UserPointLogEntity } from '../../libs/entity/userPoint/userPointLog.entity';
import { UserPointLogCreatedByEnum } from '../../libs/entity/userPoint/enum/UserPointLogCreatedBy.enum';

@injectable()
export class AddPointToRdbService {
  constructor(
    @inject(UserCoinRepository)
    private readonly userCoinRepository: UserCoinRepository,

    @inject(UserPointRepository)
    private readonly userPointRepository: UserPointRepository,
  ) {}

  async addPointByCoinIds(coinIds: number[]) {
    const coins = await this.userCoinRepository.getUserCoinWithIssuePointByIds(coinIds);

    await this.userPointRepository.bulkInsert(
      coins.map((e) =>
        UserPointLogEntity.create({
          userId: e.userId,
          changePoint: e.issuePoint!,
          createdBy: UserPointLogCreatedByEnum.COIN,
          createdById: e.id.toString(),
        }),
      ),
    );
  }
}
