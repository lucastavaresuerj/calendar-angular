import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { ApiService, DayService, UtilService } from '..';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private daysQuery!: QueryRef<
    { days: day[] },
    {
      range: DateRange;
    }
  >;

  constructor(
    private api: ApiService,
    private dayService: DayService,
    private util: UtilService
  ) {
    this.daysQuery = this.api.getDaysQuery();

    this.dayService.getDayObservable().subscribe(async (day) => {
      const { year, month, date } = this.util.getDateAtt(day);
      await this.daysQuery.setVariables({
        range: {
          begin: new Date(year, month, date),
          end: new Date(year, month, date + 15),
        },
      });
      this.daysQuery.refetch();
    });
  }

  get days() {
    return this.daysQuery.valueChanges;
  }

  refresh() {
    this.daysQuery.refetch();
  }
}
