import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @Input() category: color = 'primary';
  @Input() type: string = 'button';
  @Input() outline: color = '';
  @Input() dropdown!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'type', this.type);
    this.addClass('btn');

    if (this.outline) {
      this.addClass(`btn-outline-${this.outline}`);
    } else {
      this.addClass(`btn-${this.category}`);
    }
    if (this.dropdown == '') {
      this.addClass('dropdown-toggle');
    }
  }
}
