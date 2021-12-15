import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[attached]',
})
export class AttachedDirective implements OnInit {
  @Input() attached: 'top' | 'bottom' | boolean | undefined = true;

  style: { [name: string]: { [style: string]: number } } = {
    top: {
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
      'margin-top': 0,
    },
    bottom: {
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
      'margin-bottom': 0,
    },
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  setStyle(style: string, value: string) {
    this.renderer.setStyle(this.el.nativeElement.firstChild, style, value);
  }

  mapStyle(style: { [key: string]: number }) {
    for (let [styleName, value] of Object.entries(style)) {
      this.setStyle(styleName, value.toString());
    }
  }

  ngOnInit(): void {
    console.log(this.attached);
    if (this.attached == 'top') {
      this.mapStyle(this.style.top);
    } else if (this.attached == 'bottom') {
      this.mapStyle(this.style.bottom);
    } else if (this.attached == true) {
      this.mapStyle({ ...this.style.top, ...this.style.bottom });
    }
  }
}
