import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[spacing]',
})
export class SpacingDirective implements AfterViewInit {
  @Input() spacing!: string | string[];

  validate(expression: string) {
    return /^[mp][tbsexy]-(xs|sm|md|lg|xl|xxl-)?([0-5]|auto)$/g.test(
      expression
    );
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  checkAndAdd(expression: string) {
    if (this.validate(expression)) {
      this.addClass(expression);
    } else {
      console.error(new Error('class malformed'));
    }
  }

  ngAfterViewInit(): void {
    if (typeof this.spacing == 'string') {
      this.checkAndAdd(this.spacing);
    } else {
      [...this.spacing].map((expression: string) =>
        this.checkAndAdd(expression)
      );
    }
  }
}
