import { ErrorCode } from '../../libs/error/errorCode';
import { statusCodeByErrorCode } from '../../libs/error/statusCodeByErrorCode';

export class CustomError extends Error {
  private readonly _code: ErrorCode;

  private readonly _error?: Error;

  constructor(code: ErrorCode, message: string, err?: Error) {
    super(message);
    this.name = this.constructor.name;
    this._code = code;
    this._error = err;
  }

  get statusCode() {
    return statusCodeByErrorCode[this._code];
  }

  public static isCustomError(error: Error): error is CustomError {
    return error.name === this.constructor.name;
  }
}