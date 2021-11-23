import { Injectable } from '@angular/core';
import { DayService } from '..';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getDays(date: Date) {
    return [this.db[0]];
  }

  db: dateEvent[] = [
    {
      name: 'Evento rápido',
      begin: new Date(2021, 10, 22, 15, 0),
      end: new Date(2021, 10, 22, 15, 30),
    },
    {
      name: 'evento demorado',
      begin: new Date(2021, 10, 22, 17, 0),
      end: new Date(2021, 10, 22, 18, 0),
    },
    {
      name: 'sem criatividade para dar nomes de eventos',
      begin: new Date(2021, 10, 25, 9, 30),
      end: new Date(2021, 10, 25, 15, 0),
    },
    {
      name: 'Foi o melhor que eu consegui pensar',
      begin: new Date(2021, 10, 25, 20, 0),
      end: new Date(2021, 10, 25, 20, 30),
    },
  ];

  constructor() {}
}
