import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApiService, EventsService } from 'src/app/services';

@Component({
  selector: 'app-left-painel',
  templateUrl: './left-painel.component.html',
  styleUrls: ['./left-painel.component.scss'],
})
export class LeftPainelComponent implements OnInit {
  @ViewChild('datepicker') datepicker!: ElementRef;

  title: string = 'Criar evento';

  constructor(private api: ApiService, private eventService: EventsService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  createEvent(event: dateEvent) {
    this.api
      .createEvent(event)
      .subscribe({ next: () => this.eventService.refresh() });
  }
}
