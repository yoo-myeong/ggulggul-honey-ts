import { CreateRaffleTicket } from '../../../../../src/libs/domain/ticket/CreateRaffleTicket';
import { DateTimeUtil } from '../../../../../src/libs/util/DateTimeUtil';

describe('CreateRaffleTicket', () => {
  it('유효한 추첨티켓을 만들 수 있다', async () => {
    const targetDate = new Date();
    const validParams = {
      explanation: 'explanation explanation explanation',
      originPrice: 500,
      salePrice: 400,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['url1', 'url2'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 49),
      applyEndDate: DateTimeUtil.DateAddHours(targetDate, 2),
    };

    const ticket = await CreateRaffleTicket.create(validParams);

    expect(ticket).toBeInstanceOf(CreateRaffleTicket);
  });

  it('할인가가 원가보다 작지 않으면 에러를 던진다', async () => {
    const targetDate = new Date();
    const invalidParams = {
      explanation: 'explanation explanation explanation',
      originPrice: 400,
      salePrice: 500,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['url1', 'url2'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 49),
      applyEndDate: DateTimeUtil.DateAddHours(targetDate, 2),
    };

    await expect(CreateRaffleTicket.create(invalidParams)).rejects.toThrow('invalid sale price');
  });

  it('사용자가 티켓으로 방문할 시간은 현재시간보다 48시간 이후여야 한다', async () => {
    const targetDate = new Date();
    const invalidParams = {
      explanation: 'explanation explanation explanation',
      originPrice: 500,
      salePrice: 400,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['url1', 'url2'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 47),
      applyEndDate: DateTimeUtil.DateAddHours(targetDate, 2),
    };

    await expect(CreateRaffleTicket.create(invalidParams)).rejects.toThrow('invalid sell date');
  });

  it('추첨 티켓 신청 마감시간은 판매일시 하루전이며, 현재시간보다 1시간 이후여야 한다', async () => {
    const targetDate = new Date();
    const invalidParams = {
      explanation: 'explanation explanation explanation',
      originPrice: 500,
      salePrice: 400,
      title: 'Sample title',
      quantity: 3,
      imageUrls: ['url1', 'url2'],
      sellDate: DateTimeUtil.DateAddHours(targetDate, 49),
      applyEndDate: targetDate,
    };

    await expect(CreateRaffleTicket.create(invalidParams)).rejects.toThrow('invalid apply end date');
  });
});
