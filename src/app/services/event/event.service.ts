import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type action = { type: string; event: dateEvent };

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private event!: BehaviorSubject<action>;
  private emptyEvent: action = {
    type: 'create',
    event: {
      name: '',
      begin: new Date(),
      end: new Date(),
    },
  };

  constructor() {
    this.event = new BehaviorSubject<action>(this.emptyEvent);
  }

  createEvent() {}
}
