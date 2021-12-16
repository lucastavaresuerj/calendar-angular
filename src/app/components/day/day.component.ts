import { Component, Input, OnInit } from '@angular/core';
import { DayService } from 'src/app/services/';

@Component({
  selector: '[app-day]',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() day!: day;

  constructor(private dayService: DayService) {}

  ngOnInit(): void {
    // console.log(this.day);
  }

  get dayDate() {
    return new Date(this.day.date);
  }

  checkWithDayApp() {
    return this.dayDate.getTime() === new Date().setHours(0, 0, 0, 0);
  }
}
