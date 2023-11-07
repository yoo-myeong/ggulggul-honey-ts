import dayjs from 'dayjs';

export class DateTimeUtil {
  static DateAddMinute(datetime: Date, minute: number) {
    return dayjs(datetime).add(minute, 'minutes').toDate();
  }

  static DateAddHours(datetime: Date, hours: number) {
    return dayjs(datetime).add(hours, 'hours').toDate();
  }

  static DateSubtractHours(datetime: Date, hours: number) {
    return dayjs(datetime).subtract(hours, 'hours').toDate();
  }
}
