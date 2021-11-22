import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Directive({
  selector: '[bg-color]',
})
export class BgColorDirective implements OnInit {
  @Input('bg-color') bgColor: color = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.bgColor) {
      this.renderer.addClass(this.el.nativeElement, `bg-${this.bgColor}`);
    }
  }
}
