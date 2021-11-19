import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CalendarValue, DatePickerComponent } from 'ng2-date-picker';
import { DayService } from 'src/app/services/day.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('dayPicker') datePicker!: DatePickerComponent;

  selectedDate!: Date;

  config = {
    hideOnOutsideClick: false,
    hideInputContainer: true,
    closeOnSelect: false,
    locale: 'pt-BR',
    monthFormatter: (date: moment.Moment) =>
      date
        .format('MMMM [de] YYYY')
        .replace(/^(.)/g, (math, p1) => p1.toUpperCase()),
    weekDayFormatter: (a: number) => ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][a],
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private day: DayService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //this.datePicker.api.moveCalendarTo('06-08-2021');
    //this.selectedDate = new Date('06-08-2021');

    this.day.getDay().subscribe((date: Date) => {
      console.log(date);
      this.datePicker.moveCalendarTo(
        date.toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        })
      );
    });
  }

  onChange(event: moment.Moment) {
    if (event) {
      this.day.setDay(event.toDate());
      console.log(this.datePicker);
    }
  }

  onSelect(event: any) {
    console.log(event);
    console.log(this.selectedDate);
  }

  onCurrent() {
    this.day.setDay(new Date());
  }

  open() {
    this.datePicker.api.open();
  }
}
