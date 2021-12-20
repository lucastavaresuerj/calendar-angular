import { Component, OnInit } from '@angular/core';
import {
  ApiService,
  DayService,
  EventsService,
  UtilService,
} from 'src/app/services';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  days!: day[];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.days.subscribe({
      next: ({ data: { days } }) => {
        this.days = days;
      },
      error: (err) => console.log(err),
    });
  }
}
