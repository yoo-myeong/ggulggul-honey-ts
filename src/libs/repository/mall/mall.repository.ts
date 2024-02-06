import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { InjectType } from '../../config/InjectType';
import { MallEntity } from '../../entity/mall/mall.entity';
import { CustomError } from '../../../api/filter/CustomError';
import { ErrorCode } from '../../error/errorCode';

@injectable()
export class MallRepository {
  constructor(
    @inject(InjectType.MallEntityRepository)
    private readonly mallRepository: Repository<MallEntity>,
  ) {}

  async getById(id: number) {
    const mall = await this.mallRepository.findOneBy({ id });
    if (!mall) throw new CustomError(ErrorCode.NOT_FOUND, 'mall not found');

    return mall;
  }
}
