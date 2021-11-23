import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[sizing]',
})
export class SizingDirective implements AfterViewInit {
  @Input() width!: sizing;
  @Input() height!: sizing;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addClass(theClass: string) {
    this.renderer.addClass(this.el.nativeElement, theClass);
  }

  ngAfterViewInit(): void {
    if (this.width) {
      this.addClass(`w-${this.width}`);
    }
    if (this.height) {
      this.addClass(`h-${this.height}`);
    }
  }
}
