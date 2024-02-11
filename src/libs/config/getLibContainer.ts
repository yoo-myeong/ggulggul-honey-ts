import { Container } from 'inversify';
import { UserPointRepository } from '../repository/userPoint/userPoint.repository';
import { UserCoinRepository } from '../repository/userPoint/userCoin.repository';
import { InjectType } from './InjectType';
import { TypeOrm } from '../repository/TypeOrm';
import { IoRedis } from '../redis/IoRedis';
import { MallRepository } from '../repository/mall/mall.repository';
import { MallEntity } from '../entity/mall/mall.entity';
import { UserCoinEntity } from '../entity/userPoint/userCoin.entity';
import { UserPointLogEntity } from '../entity/userPoint/userPointLog.entity';
import { RaffleTicketEntity } from '../entity/ticket/raffleTicket.entity';

export const getLibContainer = () => {
  const container = new Container();

  // redis
  container.bind(InjectType.IoRedis).toConstantValue(IoRedis.redis);

  // entity repositry
  container.bind(InjectType.MallEntityRepository).toConstantValue(TypeOrm.getRepository(MallEntity));
  container.bind(InjectType.UserCoinEntityRepository).toConstantValue(TypeOrm.getRepository(UserCoinEntity));
  container.bind(InjectType.UserPointLogEntityRepository).toConstantValue(TypeOrm.getRepository(UserPointLogEntity));
  container.bind(InjectType.RaffleTicketEntityRepository).toConstantValue(TypeOrm.getRepository(RaffleTicketEntity));

  // respository
  container.bind(UserPointRepository).to(UserPointRepository);
  container.bind(UserCoinRepository).to(UserCoinRepository);
  container.bind(MallRepository).to(MallRepository);

  return container;
};
