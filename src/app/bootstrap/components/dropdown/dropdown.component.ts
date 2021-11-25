import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() actions!: { name: string; href?: string; click?: Function }[];
  @Input() title!: string;

  @Input() category: color = 'secondary';
  @Input() outline: color = '';

  constructor() {}

  ngOnInit(): void {
    if (!this.title) {
      this.title = this.actions[0].name;
    }
  }
}
