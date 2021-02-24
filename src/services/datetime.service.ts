import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
const moment = require('moment');

interface TekDate {
  value: string;
  hour: string;
  _idTime: number;
}

export class TEKDateTimeService {
  _date: Date;
  constructor(addedDate: Date) {
    this._date = addedDate;
  }

  get date() {
    return this._date;
  }

  set date(newDate: Date) {
    this._date = newDate;
  }

  /**
   * Format DateTime From Date String
   * @param dateInput string
   * @returns formattedDate Date
   */
  static formDateTime(dateTime: string) {
    if (!dateTime) return '-';
    return moment(dateTime).format(DEFAULT_FORMAT_DATE);
  }

  /**
   * Get Current Date Time Format String
   * @param
   * @returns string Ex: '2021-1-27 13:59:50'
   */

  static getCurrentTimeAndDate(): string {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
  }

  /**
   * Get List Hours in Day
   * @param
   * @return TekDate[]TekDate
   */

  static createListTimeInDay(): TekDate[] {
    const items: any[] = [];
    let array: any[] = [];
    for (let i = 1; i <= 24; i++) {
      array.push(i);
    }
    array.forEach((acc, index) => {
      const hourFormat = moment({ hour: index }).format();
      items.push({
        value: hourFormat.slice(
          hourFormat.indexOf('T') + 1,
          hourFormat.indexOf('+'),
        ),
        hour: moment({ hour: index }).format('h:mm A'),
        _idTime: index,
      });
    });
    return items;
  }
}
