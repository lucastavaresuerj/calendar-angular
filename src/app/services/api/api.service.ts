import { Injectable } from '@angular/core';
import { UtilService } from '..';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // TODO
  // Essas duas parte eu preciso implementar no back
  formattDaysEvents(accumulator: any, { begin, end, ...restEvent }: dateEvent) {
    function addKeyValueToAcc(key: string, value: dateEvent) {
      return {
        ...accumulator,
        [key]: accumulator[key] ? [...accumulator[key], value] : [value],
      };
    }

    let daysDiff = this.util.dateDiffDay(end, begin);
    if (daysDiff == 0) {
      let keyDate: string = this.util.getDateDayString(begin);
      return addKeyValueToAcc(keyDate, { ...restEvent, begin, end });
    } else {
      let daysBetween = this.util.getDaysBetween(begin, end);

      return daysBetween.reduce((acc, day) => {
        let keyDate: string = this.util.getDateDayString(day);
        return {
          ...addKeyValueToAcc(keyDate, { ...restEvent, begin, end }),
          ...acc,
        };
      }, {} as any);
    }
  }

  // O retorno dessas função é o objeto que eu devo receber do back
  getDays(initialDate: Date): any {
    const daysKeys = [...this.db].reduce(this.formattDaysEvents, {} as any);
    return Object.keys(daysKeys)
      .map((date) => ({
        date: new Date(date),
        events: daysKeys[date],
      }))
      .sort((a, b) => (a.date.getTime() < b.date.getTime() ? -1 : 1))
      .filter(({ date }) => this.util.dateDiffDay(date, initialDate) >= 0);
  }

  users = [
    { id: 1, name: 'José' },
    { id: 2, name: 'Will' },
    { id: 3, name: 'Grace' },
  ];

  db: dateEvent[] = [
    {
      name: 'Evento rápido',
      begin: new Date(2021, 10, 22, 15, 0),
      end: new Date(2021, 10, 22, 15, 30),
      guests: [
        { ...this.users[1], confirmation: true },
        { ...this.users[2], confirmation: true },
      ],
    },
    {
      name: 'evento demorado',
      begin: new Date(2021, 10, 22, 17, 0),
      end: new Date(2021, 10, 24, 18, 0),
    },
    {
      name: 'sem criatividade para dar nomes de eventos',
      begin: new Date(2021, 10, 25, 9, 30),
      end: new Date(2021, 10, 26, 15, 0),
    },
    {
      name: 'Foi o melhor que eu consegui pensar',
      begin: new Date(2021, 10, 25, 20, 0),
      end: new Date(2021, 10, 25, 22, 0),
    },
    {
      name: 'Evento que pega quase o dia todo',
      begin: new Date(2021, 10, 29, 10, 0),
      end: new Date(2021, 10, 29, 22, 0),
    },
  ];

  getUsers() {
    return this.users;
  }

  editEvent(event: any) {
    return event;
  }

  deleteEvent(event: any) {
    return;
  }

  constructor(private util: UtilService) {
    this.formattDaysEvents = this.formattDaysEvents.bind(this);
  }
}
