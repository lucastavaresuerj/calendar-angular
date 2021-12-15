import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginErrorMessage = '';
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  get formControl() {
    return this.form.controls;
  }

  printForm(): void {
    console.log(this.form);
    console.log(this.loginErrorMessage);
  }

  onCloseAlert() {
    this.loginErrorMessage = '';
  }

  onSubmit() {
    console.log(this.form.value);
    this.authService.login(this.form.value, (data: any) => {
      if (data.extensions) {
        this.loginErrorMessage = data.message;
      }
      this.submitted = true;
    });
  }
}
