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
    console.log(this.day);
  }

  checkWithDayApp() {
    return (
      this.day.date.getTime() ===
      new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    );
  }
}
