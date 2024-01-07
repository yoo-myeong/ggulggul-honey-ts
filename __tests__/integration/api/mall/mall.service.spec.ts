import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../src/libs/repository/TypeOrm';
import { MallEntity } from '../../../../src/libs/entity/mall/MallEntity';
import { getMySqlTypeOrmTestOption } from '../../getMySqlTypeOrmTestOption';
import { MallService } from '../../../../src/api/mall/mall.service';
import { CustomError } from '../../../../src/api/filter/CustomError';

describe('MallService', () => {
  let mallRepository: Repository<MallEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    mallRepository = TypeOrm.getRepository<MallEntity>(MallEntity);
  });

  beforeEach(async () => {
    await mallRepository.delete({});
  });

  afterAll(() => {
    mallRepository.clear();
  });

  it('id로 매장이 조회되지 않으면, 에러를 던진다', async () => {
    const sut = new MallService(mallRepository);

    const result = async () => {
      await sut.getById(1);
    };

    await expect(result).rejects.toThrow(CustomError);
  });

  it('id를 통해 매장 정보를 조회한다', async () => {
    const sut = new MallService(mallRepository);
    const mall = new MallEntity();
    mall.address = '서울 강남구 대치동';
    mall.phone = '02-123-456';

    const savedMall = await mallRepository.save(mall);
    const result = await sut.getById(savedMall.id);

    expect(result.id).toEqual(savedMall.id);
  });
});
