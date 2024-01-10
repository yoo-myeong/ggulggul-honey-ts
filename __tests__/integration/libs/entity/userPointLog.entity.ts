import { v4 as uuidV4 } from 'uuid';
import { UserPointLogEntity } from '../../../../src/libs/entity/userPoint/userPointLog.entity';

export const createUserPointLogEntity = (ctx: {
  changePoint: number;
  userId?: number;
  pointRequestId?: string;
  modifiedBy?: string;
}) => {
  const log = new UserPointLogEntity();
  log.changePoint = ctx.changePoint;
  log.userId = ctx.userId ?? 1;
  log.pointRequestId = ctx.pointRequestId ?? uuidV4();
  log.modifiedBy = ctx.modifiedBy ?? 'while running jest';

  return log;
};
