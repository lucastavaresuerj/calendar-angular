import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { color } from 'src/app/shared/types/color';
import { corner } from 'src/app/shared/types/corner';

@Directive({
  selector: '[border]',
})
export class BorderDirective implements OnInit {
  @Input() border: corner | corner[] | undefined = '';
  @Input('not-border') notBorder: corner | corner[] = '';
  @Input('border-color') borderColor: color = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  ngOnInit(): void {
    if (typeof this.border == 'undefined') {
      return;
    }
    if (!this.border) {
      this.addClass('border');
    } else {
      if (typeof this.border !== 'string') {
        for (let border of [...this.border]) {
          this.addClass(`border-${border}`);
        }
      } else {
        this.addClass(`border-${this.border}`);
      }
    }

    if (this.notBorder) {
      if (typeof this.notBorder !== 'string') {
        for (let notBorder of [...this.notBorder]) {
          this.addClass(`border-${notBorder}-0`);
        }
      } else {
        this.addClass(`border-${this.notBorder}`);
      }
    }

    if (this.borderColor) {
      this.addClass(`border-${this.borderColor}`);
    }
  }
}
