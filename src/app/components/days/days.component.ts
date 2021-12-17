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
    this.dayService.getDayObservable().subscribe((day) => {
      const { year, month, date } = this.util.getDateAtt(day);
      this.api
        .getDays({
          begin: new Date(year, month, date),
          end: new Date(year, month, date + 15),
        })
        .subscribe({
          next: ({ data: { days } }) => {
            console.log(days);
            this.days = days;
          },
          error: (err) => console.log(err),
        });
    });
  }
}
