import { Component, OnInit } from '@angular/core';

import { DayService } from 'src/app/services/day.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public day: DayService) {}

  ngOnInit(): void {}
}
