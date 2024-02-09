import { Repository } from 'typeorm';
import { RaffleTicketEntity } from '../../../../src/libs/entity/ticket/raffleTicket.entity';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { CreateRaffleTicket } from '../../../../src/libs/domain/ticket/CreateRaffleTicket';
import { DateTimeUtil } from '../../../../src/libs/util/DateTimeUtil';
import { RaffleTicketService } from '../../../../src/customer-api/ticket/raffle-ticket.service';

describe('RaffleTicketService', () => {
  let raffleTicketEntityRepository: Repository<RaffleTicketEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());

    raffleTicketEntityRepository = TypeOrm.getRepository<RaffleTicketEntity>(RaffleTicketEntity);
  });

  beforeEach(async () => {
    await raffleTicketEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('추첨 티켓 도메인을 영속화한다', async () => {
    const sut = new RaffleTicketService(raffleTicketEntityRepository);
    const targetDate = new Date();
    const raffleTicketParam = {
      explanation: 'explanation explanation explanation',
      originPrice: 500,
      salePrice: 400,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['url1', 'url2'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 49),
      applyEndDate: DateTimeUtil.DateAddHours(targetDate, 2),
    };
    const createRaffleTicket = await CreateRaffleTicket.create(raffleTicketParam);

    await sut.createRaffleTicket(createRaffleTicket);
    const [raffleTicket] = await raffleTicketEntityRepository.find();

    expect(raffleTicket.explanation).toBe(raffleTicketParam.explanation);
    expect(raffleTicket.sellDate).toEqual(raffleTicketParam.sellDate);
  });
});
