import { Component, OnInit } from '@angular/core';
import { ApiService, DayService, UtilService } from 'src/app/services';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  days!: day[];

  constructor(
    private api: ApiService,
    private dayService: DayService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.dayService.getDayObservable().subscribe((date) => {
      const { year, month, day } = this.util.getDateAtt(date);
      this.api
        .getDays({
          begin: new Date(year, month, day),
          end: new Date(year, month, day + 15),
        })
        .subscribe(({ days }) => (this.days = days));
      console.log(this.days);
    });
  }
}
