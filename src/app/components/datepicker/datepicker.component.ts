import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepicker,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';

import { DayService } from 'src/app/services/day.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('dp') dp!: NgbDatepicker;

  selectedDate!: Date;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private day: DayService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.selectToday();

    this.day.getDay().subscribe((day: Date) => {
      console.log(day);
      this.model = {
        day: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
      };

      this.dp.navigateTo(this.model);
    });
  }

  model!: NgbDateStruct;

  date!: { year: number; month: number };

  onChange({ day, month, year }: NgbDate) {
    this.day.setDay(new Date(year, month - 1, day));
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
