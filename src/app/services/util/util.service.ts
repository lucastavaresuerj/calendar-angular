import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  // One day = 86400000 miliseconds
  dateDiffDay(dayAfter: Date, dayBefore: Date) {
    return (
      (new Date(dayAfter).setHours(0, 0, 0, 0) -
        new Date(dayBefore).setHours(0, 0, 0, 0)) /
      86400000
    );
  }

  getDateDayString(date: Date) {
    return date.toISOString().replace(/T.*/g, 'T00:00');
  }

  getDaysBetween(d1: Date, d2: Date) {
    let days: Date[] = [];
    let diffDays = this.dateDiffDay(d2, d1);
    for (let i = 0; i <= diffDays; i++) {
      let newDay = new Date(d1);
      newDay.setDate(d1.getDate() + i);
      days.push(newDay);
    }
    return days;
  }

  getDateAtt(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
      time: date.getTime(),
    };
  }

  createDateFromAtts(atts: any) {
    console.log(atts);
    const { year, month, day, date, hours, minutes, seconds, milliseconds } =
      atts;

    const d = new Date(
      year,
      month,
      typeof day === 'undefined' ? date : day,
      hours || 0,
      minutes || 0,
      seconds || 0,
      milliseconds || 0
    );
    console.log(d);
    return d;
  }
}
