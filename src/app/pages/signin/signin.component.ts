import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });

  justBreak: justifyContentBreakpoint = { md: 'start', xl: 'center' };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form);
  }
}
