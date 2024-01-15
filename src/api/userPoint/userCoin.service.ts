import { inject } from 'inversify';
import { UserCoinRepository } from '../../libs/repository/userPoint/userCoin.repository';
import { RandomPoint } from '../../libs/domain/userPoint/RandomPoint';

export class UserCoinService {
  private readonly TARGET_COUNT_FOR_FIRST = 1;

  constructor(
    @inject(UserCoinRepository)
    private readonly userCoinRepository: UserCoinRepository,
  ) {}

  async useCoin(userId: number) {
    const { coin, count } = await this.userCoinRepository.getOneAndCountByUserId(userId);
    const point =
      count === this.TARGET_COUNT_FOR_FIRST
        ? RandomPoint.generateRandomPointForFirst()
        : RandomPoint.generateRandomPoint();

    await this.userCoinRepository.updateIssuePoint(coin.id, point);

    return point;
  }
}
