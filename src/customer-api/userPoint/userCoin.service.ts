import { inject } from 'inversify';
import { UserCoinRepository } from '../../libs/repository/userPoint/userCoin.repository';
import { RandomPoint } from '../../libs/domain/userPoint/RandomPoint';
import { SqsProducer } from '../../libs/sqs/SqsProducer';
import { SendMessageParam } from '../../libs/sqs/dto/SendMessageParam';

export class UserCoinService {
  private readonly TARGET_COUNT_FOR_FIRST = 1;

  constructor(
    @inject(UserCoinRepository)
    private readonly userCoinRepository: UserCoinRepository,
    @inject(SqsProducer)
    private readonly sqsProducer: SqsProducer,
  ) {}

  async useCoin(userId: number) {
    const { coin, count } = await this.userCoinRepository.getUsableOneAndCountAllByUserId(userId);
    const point =
      count === this.TARGET_COUNT_FOR_FIRST
        ? RandomPoint.generateRandomPointForFirst()
        : RandomPoint.generateRandomPoint();

    await this.userCoinRepository.updateIssuePoint(coin.id, point);
    await this.sqsProducer.sendMessage([
      SendMessageParam.create({
        body: JSON.stringify({
          coinId: coin.id,
        }),
      }),
    ]);

    return point;
  }
}
