import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-event]',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event!: dateEvent;

  constructor() {}

  getEventFormatTime() {
    if (
      new Date(this.event.begin).setHours(0, 0, 0, 0) ==
      new Date(this.event.end).setHours(0, 0, 0, 0)
    ) {
      return `${this.event.begin.toLocaleTimeString('pt-BR', {
        hour12: true,
      })} até ${this.event.begin.toLocaleTimeString('pt-BR', {
        hour12: true,
      })}`.replace(/(.*)(A|P)M(.*)(A|P)M/g, '');
    }
    return '';
  }

  ngOnInit(): void {}
}
