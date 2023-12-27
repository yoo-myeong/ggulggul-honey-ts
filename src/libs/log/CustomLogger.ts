export class CustomLogger {
  static readonly logger = console;

  static info(...msg: unknown[]) {
    this.logger.info(...msg);
  }

  static warn(...msg: unknown[]) {
    this.logger.warn(...msg);
  }

  static error(...msg: unknown[]) {
    this.logger.error(...msg);
  }
}
