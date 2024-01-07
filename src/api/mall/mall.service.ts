import { injectable } from 'inversify';
import { MallEntity } from '../../libs/entity/mall/MallEntity';
import { TypeOrm } from '../../libs/repository/TypeOrm';
import { CustomError } from '../filter/CustomError';
import { ErrorCode } from '../../libs/error/errorCode';

@injectable()
export class MallService {
  constructor(private readonly mallRepository = TypeOrm.getRepository<MallEntity>(MallEntity)) {}

  async getById(id: number) {
    const mall = await this.mallRepository.findOneBy({ id });
    if (!mall) throw new CustomError(ErrorCode.NOT_FOUND, 'mall not found');

    return mall;
  }
}
