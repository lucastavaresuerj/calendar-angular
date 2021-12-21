import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @Input() actions!: {
    name: string;
    href?: string;
    click?: Function;
    context?: any;
  }[];
  @Input() title!: string;
  @Input() customList!: TemplateRef<any>;

  @Input() category: color = 'secondary';
  @Input() outline: color = '';

  @ViewChild('defaultList') defaultList!: TemplateRef<any>;
  template!: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.customList) {
      this.template = this.customList;
    } else {
      this.template = this.defaultList;
    }
  }

  ngOnInit(): void {
    if (!this.title) {
      this.title = this.actions[0].name;
    }
  }
}
