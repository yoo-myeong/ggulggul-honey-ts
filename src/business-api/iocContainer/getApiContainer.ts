import { Container } from 'inversify';
import { getLibContainer } from '../../libs/iocContainer/getLibContainer';
import { RaffleTicketService } from '../ticket/raffle-ticket.service';

export const getApiContainer = () => {
  const container = new Container();

  // service
  container.bind(RaffleTicketService).to(RaffleTicketService);

  return Container.merge(container, getLibContainer());
};
