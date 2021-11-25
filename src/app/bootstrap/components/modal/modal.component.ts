import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('trigger')
  trigger!: ElementRef<HTMLButtonElement>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onClose() {
    this.close.emit();
  }

  ngOnInit(): void {}
}
