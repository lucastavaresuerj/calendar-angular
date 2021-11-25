import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, AfterViewInit {
  @Input() type: alert = '';
  @Input() icon: string | boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  // alert-dismissible
  @ViewChild('alert')
  alert!: ElementRef<any>;
  closeButton: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.alert.nativeElement, theClass);
  }

  checkAndAdd(property: string | alert | boolean, expression: string) {
    if (property) {
      this.addClass(expression);
    }
  }

  onClose() {
    this.el.nativeElement.remove();
    this.close.emit();
  }

  ngAfterViewInit(): void {
    this.checkAndAdd(this.type, `alert-${this.type}`);
  }

  ngOnInit(): void {
    this.closeButton = this.close.observers.length > 0;
  }
}
