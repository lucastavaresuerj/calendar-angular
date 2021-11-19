import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('datepicker') datepicker!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
