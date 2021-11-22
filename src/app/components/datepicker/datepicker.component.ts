import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepicker,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';

import { DayService } from 'src/app/services/';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('dp') dp!: NgbDatepicker;

  selectedDate!: Date;
  model!: NgbDateStruct;

  date!: { year: number; month: number };

  constructor(private day: DayService, private calendar: NgbCalendar) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.selectToday();

    this.day.getDayObservable().subscribe((day: Date) => {
      this.model = {
        day: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
      };
      this.dp.navigateTo(this.model);
    });
  }

  onChange({ day, month, year }: NgbDate) {
    this.day.setDay(new Date(year, month - 1, day));
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
