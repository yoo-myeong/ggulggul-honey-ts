import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { MallEntity } from '../../../../src/libs/entity/mall/MallEntity';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';

describe('MallService', () => {
  let mallRepository: Repository<MallEntity>;

  beforeEach(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    mallRepository = TypeOrm.getRepository<MallEntity>(MallEntity);
  });

  it('id를 통해 매장 정보를 조회한다', () => {
    const mallCustomRepo = new MallCustomRepository(mallRepository);
    const sut = new MallService(mallCustomRepo);
    const mall = new MallEntity();
    mall.address = '서울 강남구 대치동';
    mall.phone = '02-123-456';

    const mall = await mallRepository.save(mall);
    const result = mallCustomRepo.findById(mall.id);

    expect(mall.id).toEqual(result.id);
  });
});
