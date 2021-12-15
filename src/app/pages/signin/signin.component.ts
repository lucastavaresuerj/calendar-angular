import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class SigninComponent implements OnInit {
  submitted = false;
  loginErrorMessage = '';
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

  ngOnInit(): void {}

  get formControl() {
    return this.form.controls;
  }

  onCloseAlert() {
    this.loginErrorMessage = '';
  }

  onSubmit() {
    const { name, password } = this.form.value;

    this.authService.signin({ name, password }, (data: any) => {
      if (data.extensions) {
        this.loginErrorMessage = data.message;
      }
      this.submitted = true;
    });
  }
}
