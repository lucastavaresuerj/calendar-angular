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

  get dayMonth() {
    return this.day.date.toLocaleString('pt-BR', {
      month: 'short',
    });
  }

  checkWithDayApp() {
    return this.day.date.getTime() === new Date().setHours(0, 0, 0, 0);
  }
}
