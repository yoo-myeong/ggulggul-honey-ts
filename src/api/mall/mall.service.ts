import { injectable } from 'inversify';
import { MallEntity } from '../../libs/entity/mall/MallEntity';
import { TypeOrm } from '../../libs/repository/TypeOrm';

@injectable()
export class MallService {
  constructor(private readonly mallRepository = TypeOrm.getRepository<MallEntity>(MallEntity)) {}

  async findById(id: number) {
    return await this.mallRepository.findOneBy({ id });
  }
}
