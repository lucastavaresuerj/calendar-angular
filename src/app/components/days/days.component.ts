import { Component, OnInit } from '@angular/core';
import { ApiService, DayService } from 'src/app/services';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  days!: day[];

  constructor(private api: ApiService, private dayService: DayService) {}

  ngOnInit(): void {
    this.dayService.getDayObservable().subscribe((date) => {
      this.days = this.api.getDays(date);
      console.log(this.days);
    });
  }
}
