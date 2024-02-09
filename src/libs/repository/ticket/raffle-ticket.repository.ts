import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { RaffleTicketEntity } from '../../entity/ticket/raffleTicket.entity';
import { InjectType } from '../../config/InjectType';

@injectable()
export class RaffleTicketRepository {
  constructor(
    @inject(InjectType.RaffleTicketEntityRepository)
    private readonly raffle: Repository<RaffleTicketEntity>,
  ) {}
}
