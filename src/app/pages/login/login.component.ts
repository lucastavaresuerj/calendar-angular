import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { justifyContentBreakpoint } from 'src/app/shared/types/justify-content-breakpoint';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  justBreak: justifyContentBreakpoint = { md: 'start', xl: 'center' };

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.authService.login(this.form.value);
  }
}
