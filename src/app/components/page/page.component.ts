import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  @Input() title: string = 'Calendar';

  constructor() {}

  ngOnInit(): void {
    document.title = this.title;
  }
}
