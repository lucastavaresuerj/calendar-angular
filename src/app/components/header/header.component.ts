import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  DayService,
  TokenStorageService,
} from 'src/app/services/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appDay!: string;
  username!: string;

  constructor(
    public day: DayService,
    private authService: AuthenticationService,
    private token: TokenStorageService,
    private router: Router
  ) {}

  dropdownActions = [
    {
      name: 'sair',
      click: () =>
        this.authService.logout().subscribe({
          next: () => {
            this.authService.isAuthenticated = false;
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err),
        }),
    },
  ];

  ngOnInit(): void {
    this.username = this.token.getUser().name;

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
