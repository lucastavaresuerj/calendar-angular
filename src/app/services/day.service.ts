import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  private day!: BehaviorSubject<Date>;

  constructor() {
    this.day = new BehaviorSubject<Date>(new Date());
  }

  navDays(option: 'next' | 'previous') {
    let newDay = new Date(this.day.value);
    newDay.setDate(this.day.value.getDate() + (option == 'next' ? 1 : -1));
    this.day.next(newDay);
  }

  nextDay() {
    this.navDays('next');
  }

  previousDay() {
    this.navDays('previous');
  }

  setDay(date: Date) {
    this.day.next(date);
  }

  getDay() {
    return this.day.asObservable();
  }
}
