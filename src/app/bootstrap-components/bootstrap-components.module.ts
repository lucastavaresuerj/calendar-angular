import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { GridModule } from './grid/grid.module';
import { RowComponent } from './grid/row/row.component';
import { ColComponent } from './grid/col/col.component';
import { AlertComponent } from './alert/alert.component';
import { NavModule } from './nav/nav.module';
import { NavItemComponent } from './nav/nav-item/nav-item.component';
import { NavComponent } from './nav/nav/nav.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { DirectivesModuleModule } from './directives-module/directives-module.module';
import { AttachedDirective } from './directives-module/attached/attached.directive';
import { BgColorDirective } from './directives-module/bg-color/bg-color.directive';
import { ButtonComponent } from './button/button.component';
import { AsDirective } from './directives-module/as/as.directive';
import { BorderDirective } from './directives-module/border/border.directive';

const declarations: any[] = [
  InputComponent,
  UserFormComponent,
  AlertComponent,
  ButtonComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    NavModule,
    DirectivesModuleModule,
  ],
  exports: [
    ...declarations,
    RowComponent,
    ColComponent,
    NavComponent,
    NavbarComponent,
    NavItemComponent,
    AttachedDirective,
    BgColorDirective,
    AsDirective,
    BorderDirective,
  ],
})
export class BootstrapComponentsModule {}
