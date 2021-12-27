import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted = false;
  loading!: {
    status: boolean;
    timer?: NodeJS.Timeout;
  };
  loginErrorMessage = '';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthenticationService) {}

  ngOnDestroy(): void {
    if (this.loading.timer) {
      clearTimeout(this.loading.timer);
    }
  }

  ngOnInit(): void {
    this.loading = { status: false };
  }

  get formControl() {
    return this.form.controls;
  }

  onCloseAlert() {
    this.loginErrorMessage = '';
  }

  onSubmit() {
    this.loading = {
      status: true,
      timer: setTimeout(() => (this.loading.status = false), 1000),
    };

    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        if (res.extensions) {
          this.loginErrorMessage = res.message;
          return;
        }

        this.authService.authHandler(this.form.value.name, res.token);
      },
      error: (err) => {
        this.loginErrorMessage = err.message;
      },
    });
  }
}
