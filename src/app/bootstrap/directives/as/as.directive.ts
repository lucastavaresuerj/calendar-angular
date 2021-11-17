import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[as]',
})
export class AsDirective implements OnInit {
  @Input() as: string = '';

  parentAtts!: NamedNodeMap;
  newElement!: HTMLElement;
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.as) {
      this.parentAtts = this.el.nativeElement.attributes;
      this.newElement = document.createElement(this.as);

      console.log(this.parentAtts);
      for (let index = 0; index < this.parentAtts.length; index++) {
        console.log(this.parentAtts[index].name, this.parentAtts[index].value);
        this.newElement.setAttribute(
          this.parentAtts[index].name,
          this.parentAtts[index].value
        );
      }

      console.log(this.el.nativeElement.childNodes);

      for (
        let index = 0;
        index < this.el.nativeElement.childNodes.length;
        index++
      ) {
        this.newElement.appendChild(this.el.nativeElement.childNodes[index]);
      }

      console.log(this.el.nativeElement.parentElement);
      // this.el.nativeElement.parentElement.appendChild(this.newElement);
      this.el.nativeElement.parentElement?.replaceChild(
        this.el.nativeElement,
        this.newElement
      );
    }
  }
}
