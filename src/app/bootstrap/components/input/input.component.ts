import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';

  value: string = '';
  touched = false;
  disabled = false;
  isTypePassword = false;

  constructor() {}

  togglePassword() {
    if (this.isTypePassword) {
      this.type =
        this.type == 'password'
          ? (this.type = 'text')
          : (this.type = 'password');
    }
  }

  setValue(value: string) {
    this.value = value;
    this.onChange(value);
  }

  onFocus() {
    this.onTouched();
  }

  onChange(value: string) {}

  onTouched() {}

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnInit(): void {
    this.isTypePassword = this.type == 'password';
  }
}
