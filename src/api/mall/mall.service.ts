import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { MallEntity } from '../../libs/entity/mall/mall.entity';
import { CustomError } from '../filter/CustomError';
import { ErrorCode } from '../../libs/error/errorCode';
import { InjectType } from '../../libs/config/InjectType';

@injectable()
export class MallService {
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
