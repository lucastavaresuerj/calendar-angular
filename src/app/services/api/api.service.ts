import { Injectable } from '@angular/core';
import { DayService } from '..';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getDays() {
    return this.db.filter(({ day, month, year }: Day) => {
      return (
        new Date(year, month, day).getTime() >=
        new Date(this.dayService.getDay().setHours(0, 0, 0, 0)).getTime()
      );
    });
  }

  db: Day[] = [
    {
      day: 22,
      month: 10,
      year: 2021,
      events: [
        {
          begin: {
            hours: 15,
            minutes: 0,
          },
          end: {
            hours: 15,
            minutes: 30,
          },
        },
        {
          begin: {
            hours: 17,
            minutes: 0,
          },
          end: {
            hours: 18,
            minutes: 0,
          },
        },
      ],
    },
    {
      day: 25,
      month: 10,
      year: 2021,
      events: [
        {
          begin: {
            hours: 9,
            minutes: 30,
          },
          end: {
            hours: 15,
            minutes: 0,
          },
        },
        {
          begin: {
            hours: 20,
            minutes: 0,
          },
          end: {
            hours: 20,
            minutes: 30,
          },
        },
      ],
    },
  ];

  constructor(private dayService: DayService) {}
}
