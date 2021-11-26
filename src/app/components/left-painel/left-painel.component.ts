import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-left-painel',
  templateUrl: './left-painel.component.html',
  styleUrls: ['./left-painel.component.scss'],
})
export class LeftPainelComponent implements OnInit {
  @ViewChild('datepicker') datepicker!: ElementRef;

  title: string = 'Criar evento';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  createEvent(event: string) {
    console.log(event);
  }
}
