import { Container } from 'inversify';
import { TestService } from '../test/test.service';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { MallService } from '../mall/mall.service';
import { MallEntity } from '../../libs/entity/mall/mall.entity';
import { RaffleTicketService } from '../ticket/raffle-ticket.service';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(TestService).to(TestService);
  container.bind(MallService).to(MallService);
  container.bind(RaffleTicketService).to(RaffleTicketService);

  return Container.merge(container, getLibContainer());
};
