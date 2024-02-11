import { Container } from 'inversify';
import { getLibContainer } from '../../libs/config/getLibContainer';
import { MallService } from '../mall/mall.service';
import { RaffleTicketService } from '../ticket/raffle-ticket.service';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(MallService).to(MallService);
  container.bind(RaffleTicketService).to(RaffleTicketService);

  return Container.merge(container, getLibContainer());
};
