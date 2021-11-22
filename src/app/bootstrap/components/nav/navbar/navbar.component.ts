import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() dark: boolean = false;
  @Input() color: color = '';
  @Input() border: corner | corner[] | undefined;

  navConfig: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.navConfig = [this.dark ? 'navbar-dark' : 'navbar-light'];
  }
}
