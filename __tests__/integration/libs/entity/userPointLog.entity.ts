import { v4 as uuidV4 } from 'uuid';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';
import { UserPointLogCreatedByEnum } from '../../../../src/libs/entity/userPoint/enum/UserPointLogCreatedBy.enum';

export const createUserPointLogEntity = (ctx: {
  changePoint: number;
  userId?: number;
  createdById?: string;
  createdBy?: UserPointLogCreatedByEnum;
}) => {
  const log = new UserPointLogEntity();
  log.changePoint = ctx.changePoint;
  log.userId = ctx.userId ?? 1;
  log.createdById = ctx.createdById ?? uuidV4();
  log.createdBy = ctx.createdBy ?? UserPointLogCreatedByEnum.API;

  return log;
};
