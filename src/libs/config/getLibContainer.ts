import { Container } from 'inversify';
import { TestCustomRepository } from '../repository/test/test.custom.repository';
import { UserPointRepository } from '../repository/userPoint/userPoint.repository';
import { UserCoinRepository } from '../repository/userPoint/userCoin.repository';
import { InjectType } from './InjectType';
import { TypeOrm } from '../repository/TypeOrm';
import { TestEntity } from '../entity/test/test.entity';
import { IoRedis } from '../redis/IoRedis';

export const getLibContainer = () => {
  const container = new Container();

  // redis
  container.bind(InjectType.IoRedis).toConstantValue(IoRedis.redis);

  // entity repositry
  container.bind(InjectType.TestEntityRepository).toConstantValue(TypeOrm.getRepository(TestEntity));

  // respository
  container.bind(TestCustomRepository).to(TestCustomRepository);
  container.bind(UserPointRepository).to(UserPointRepository);
  container.bind(UserCoinRepository).to(UserCoinRepository);

  return container;
};
