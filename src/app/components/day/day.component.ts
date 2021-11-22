import { Component, Input, OnInit } from '@angular/core';
import { DayService } from 'src/app/services/';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() day!: Day;

  constructor(private dayService: DayService) {}

  ngOnInit(): void {
    console.log(this.day);
  }

  checkWithDayApp() {
    const { year, month, day } = this.day;
    return (
      new Date(year, month, day).getTime() ===
      new Date(this.dayService.getDay().setHours(0, 0, 0, 0)).getTime()
    );
  }
}
