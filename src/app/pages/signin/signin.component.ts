import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  submitted = false;
  loading!: {
    status: boolean;
    timer?: NodeJS.Timeout;
  };
  signinErrorMessage = '';
  minLengthPass = 6;

  form: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLengthPass),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLengthPass),
      ]),
    },
    [this.passwordValidator]
  );

  passwordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;

    let error: ValidationErrors | null = null;

    if (password !== repeatPassword) {
      error = { password: 'As senhas devem ser iguais' };
    }

    return error;
  }

  constructor(private authService: AuthenticationService) {}

  ngOnDestroy(): void {
    if (this.loading.timer) {
      clearTimeout(this.loading.timer);
    }
  }

  ngOnInit(): void {}

  get formControl() {
    return this.form.controls;
  }

  onCloseAlert() {
    this.signinErrorMessage = '';
  }

  onSubmit() {
    this.loading = {
      status: true,
      timer: setTimeout(() => (this.loading.status = false), 1000),
    };
    this.signinErrorMessage = '';

    const { name, password } = this.form.value;

    this.authService.signin({ name, password }).subscribe({
      next: (res: any) => {
        if (res.erros) {
          this.signinErrorMessage = res.erros[0].message;
        }

        this.authService.authHandler(this.form.value.name, res.token);
      },
      error: (err) => {
        this.signinErrorMessage = err.message;
      },
    });
  }
}
