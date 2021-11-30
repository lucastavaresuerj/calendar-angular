import { Injectable } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '..';

type action = { type: string; eventForm: any };

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private event!: BehaviorSubject<action>;
  private emptyEvent!: action;

  constructor(private calendar: NgbCalendar, private util: UtilService) {
    this.event = new BehaviorSubject<action>(this.emptyEvent);
  }

  createEvent() {
    const now = this.util.getDateAtt(new Date());
    const timeBegin = { hour: now.hours, minute: now.minutes, second: 0 };

    const nowPlus30 = this.util.getDateAtt(
      new Date(new Date().setMinutes(timeBegin.minute + 30))
    );
    const timeEnd = {
      hour: nowPlus30.hours,
      minute: nowPlus30.minutes,
      second: 0,
    };

    this.emptyEvent = {
      type: 'create',
      eventForm: {
        name: '',
        begin: this.calendar.getToday(),
        end: this.calendar.getToday(),
        timeBegin,
        timeEnd,
      },
    };
  }
}
