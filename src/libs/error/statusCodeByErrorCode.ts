import { ErrorCode } from './errorCode';

export const statusCodeByErrorCode: { [key in ErrorCode]: number } = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,

  [ErrorCode.DUPLICATED]: 400,
};
