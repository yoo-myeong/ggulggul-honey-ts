import { ErrorCode } from './errorCode';

export class CustomError extends Error {
  private readonly _code: ErrorCode;

  private readonly _error?: Error;

  constructor(code: ErrorCode, message: string, err?: Error) {
    super(message);
    this.name = this.constructor.name;
    this._code = code;
    this._error = err;
  }

  public static isCustomError(error: Error) {
    return error.name === this.constructor.name;
  }
}
