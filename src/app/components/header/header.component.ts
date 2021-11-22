import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DayService } from 'src/app/services/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appDay!: String;

  dropdownActions = [
    {
      name: 'sair',
      click: () => this.auth.logout(),
    },
  ];

  constructor(public day: DayService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.day.getDayObservable().subscribe(
      (date) =>
        (this.appDay = date
          .toLocaleDateString('pt-BR', {
            day: 'numeric',
            weekday: 'long',
            month: 'short',
            year: 'numeric',
          })
          .replace(
            /^(.)(.+?de )(.)/g,
            (match, p1: string, p2: string, p3: string) =>
              p1.toUpperCase() + p2 + p3.toUpperCase()
          ))
    );
    console.log(this.appDay);
  }
}
