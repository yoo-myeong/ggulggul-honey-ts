import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { InjectType } from '../../libs/iocContainer/InjectType';
import { RaffleTicketEntity } from '../../libs/entity/ticket/raffleTicket.entity';
import { CreateRaffleTicket } from '../../libs/domain/ticket/CreateRaffleTicket';

@injectable()
export class RaffleTicketService {
  constructor(
    @inject(InjectType.RaffleTicketEntityRepository)
    private readonly raffleTicketEntityRepository: Repository<RaffleTicketEntity>,
  ) {}

  async createRaffleTicket(createRaffleTicket: CreateRaffleTicket) {
    createRaffleTicket.validate();
    await this.raffleTicketEntityRepository.insert(createRaffleTicket.toEntity());
  }
}
