import { Component, OnInit } from '@angular/core';
import { DayService } from 'src/app/services';

@Component({
  selector: 'app-web-calendar',
  templateUrl: './web-calendar.component.html',
  styleUrls: ['./web-calendar.component.scss'],
})
export class WebCalendarComponent implements OnInit {
  today!: Date;
  constructor(private day: DayService) {}

  ngOnInit(): void {
    this.day.getDayObservable().subscribe((date) => (this.today = date));
  }
}
