import { controller, httpPost, HttpResponseMessage, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CreateRaffleTicketRequest, ICreateRaffleTicketRequest } from './dto/CreateRaffleTicketRequest';
import { RaffleTicketService } from './raffle-ticket.service';

@controller('/raffle-ticket')
export class RaffleTicketController {
  constructor(
    @inject(RaffleTicketService)
    private readonly raffleTicketService: RaffleTicketService,
  ) {}

  @httpPost('/')
  async createRaffleTicket(@requestBody() body: ICreateRaffleTicketRequest) {
    const createRaffleTicketRequest = await CreateRaffleTicketRequest.transform(body);
    await this.raffleTicketService.createRaffleTicket(await createRaffleTicketRequest.toDomain());
    return new HttpResponseMessage(201);
  }
}
