import { inject, injectable } from 'inversify';
import { MallRepository } from '../../libs/repository/mall/mall.repository';
import { GetMallByIdResponse } from './dto/GetMallByIdResponse';

@injectable()
export class MallService {
  constructor(
    @inject(MallRepository)
    private readonly mallRepository: MallRepository,
  ) {}

  async getById(id: number) {
    const mall = await this.mallRepository.getById(id);
    return GetMallByIdResponse.of({
      address: mall.address,
      phone: mall.phone,
    });
  }
}
