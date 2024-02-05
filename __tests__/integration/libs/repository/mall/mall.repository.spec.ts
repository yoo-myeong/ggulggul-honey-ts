import { Repository } from 'typeorm';
import { TypeOrm } from '../../../../../src/libs/repository/TypeOrm';
import { getMySqlTypeOrmTestOption } from '../../../getMySqlTypeOrmTestOption';
import { MallEntity } from '../../../../../src/libs/entity/mall/mall.entity';
import { CustomError } from '../../../../../src/api/filter/CustomError';
import { MallRepository } from '../../../../../src/libs/repository/mall/mall.repository';

describe('MallRepository', () => {
  let mallEntityRepository: Repository<MallEntity>;

  beforeAll(async () => {
    await TypeOrm.connect(getMySqlTypeOrmTestOption());
    mallEntityRepository = TypeOrm.getRepository<MallEntity>(MallEntity);
  });

  beforeEach(async () => {
    await mallEntityRepository.delete({});
  });

  afterAll(async () => {
    await TypeOrm.disconnect();
  });

  it('id로 매장이 조회되지 않으면, 에러를 던진다', async () => {
    const sut = new MallRepository(mallEntityRepository);

    const result = async () => {
      await sut.getById(1);
    };

    await expect(result).rejects.toThrow(CustomError);
  });

  it('id를 통해 매장 정보를 조회한다', async () => {
    const sut = new MallRepository(mallEntityRepository);
    const mall = new MallEntity();
    mall.address = '서울 강남구 대치동';
    mall.phone = '02-123-456';

    const savedMall = await mallEntityRepository.save(mall);
    const result = await sut.getById(savedMall.id);

    expect(result.id).toEqual(savedMall.id);
  });
});
