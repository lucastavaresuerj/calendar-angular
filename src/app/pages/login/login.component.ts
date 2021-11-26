import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services';

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

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.authService.login(this.form.value);
  }
}
