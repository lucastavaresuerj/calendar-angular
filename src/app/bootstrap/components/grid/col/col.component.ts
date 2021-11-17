import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import {
  columnsBreakSize,
  align,
  justifyContent,
  size,
  justifyContentBreakpoint,
} from 'src/app/shared/types/types';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss'],
})
export class ColComponent implements OnInit, AfterViewInit {
  @Input() size: size = '';
  @Input('size-break') sizeBreak: columnsBreakSize = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  checkAndAdd(
    property: string | columnsBreakSize | justifyContentBreakpoint | size,
    expression: Function
  ) {
    if (property) {
      if (typeof property == 'string') {
        this.addClass(expression());
        return;
      }
      Object.keys(property).map((key) => this.addClass(expression(key)));
    }
  }

  ngAfterViewInit(): void {
    if (!this.size) {
      this.addClass('col');
    }
    this.checkAndAdd(this.size, () => `col-${this.size.toString()}`);

    this.checkAndAdd(
      this.sizeBreak,
      (breakPoint: keyof columnsBreakSize) =>
        `row-cols-${breakPoint}-${
          this.sizeBreak[breakPoint as keyof columnsBreakSize]
        }`
    );
  }
}
