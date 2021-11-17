import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { align } from 'src/app/shared/types/align';
import { justifyContent } from 'src/app/shared/types/justify-content';
import {
  columnsBreakSize,
  justifyContentBreakpoint,
} from 'src/app/shared/types/types';

@Directive({
  selector: '[flex]',
})
export class FlexDirective implements AfterViewInit {
  @Input('align-items') alignItems: align = '';
  @Input('justify-content') justifyContent: justifyContent = '';
  @Input('justify-content-breakpoint')
  justifyContentBreakpoint: justifyContentBreakpoint = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  checkAndAdd(
    property: string | columnsBreakSize | justifyContentBreakpoint,
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
    console.log(this.alignItems, this.justifyContent);

    this.checkAndAdd(this.alignItems, () => `align-items-${this.alignItems}`);

    this.checkAndAdd(
      this.justifyContent,
      () => `justify-content-${this.justifyContent}`
    );

    this.checkAndAdd(
      this.justifyContentBreakpoint,
      (breakPoint: keyof columnsBreakSize) =>
        `justify-content-${breakPoint}-${
          this.justifyContentBreakpoint[breakPoint as keyof columnsBreakSize]
        }`
    );
  }
}
