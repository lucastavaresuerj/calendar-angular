import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { GridModule } from './grid/grid.module';
import { RowComponent } from './grid/row/row.component';
import { ColComponent } from './grid/col/col.component';
import { AlertComponent } from './alert/alert.component';
import { AttachedDirective } from './directives/attached/attached.directive';

const declarations: any[] = [
  InputComponent,
  UserFormComponent,
  AlertComponent,
  AttachedDirective,
];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, FormsModule, GridModule],
  exports: [...declarations, RowComponent, ColComponent],
})
export class BootstrapComponentsModule {}
