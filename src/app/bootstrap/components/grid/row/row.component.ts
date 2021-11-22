import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements AfterViewInit {
  @Input('align-items') alignItems: align = '';
  @Input('justify-content') justifyContent: justifyContent = '';
  @Input('justify-content-breakpoint')
  justifyContentBreakpoint: justifyContentBreakpoint = {};
  @Input('cols') columns: size = '';
  @Input('cols-breakpoints-size') columnsSize: columnsBreakSize = {};

  @ViewChild('row') row!: ElementRef<HTMLElement>;

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
    this.addClass('row');

    // this.checkAndAdd(this.alignItems, () => `align-items-${this.alignItems}`);
    //
    // this.checkAndAdd(
    //   this.justifyContent,
    //   () => `justify-content-${this.justifyContent}`
    // );

    this.checkAndAdd(this.columns.toString(), () => `row-cols-${this.columns}`);

    this.checkAndAdd(
      this.columnsSize,
      (breakPoint: keyof columnsBreakSize) =>
        `row-cols-${breakPoint}-${
          this.columnsSize[breakPoint as keyof columnsBreakSize]
        }`
    );

    // this.checkAndAdd(
    //   this.justifyContentBreakpoint,
    //   (breakPoint: keyof columnsBreakSize) =>
    //     `justify-content-${breakPoint}-${
    //       this.justifyContentBreakpoint[breakPoint as keyof columnsBreakSize]
    //     }`
    // );
  }
}
