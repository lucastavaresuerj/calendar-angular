import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  days!: Day[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.days = this.api.getDays();
    console.log(this.days);
  }
}
