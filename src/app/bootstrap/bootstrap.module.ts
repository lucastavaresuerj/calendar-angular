import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './components/input/input.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GridModule } from './components/grid/grid.module';
import { RowComponent } from './components/grid/row/row.component';
import { ColComponent } from './components/grid/col/col.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavModule } from './components/nav/nav.module';
import { NavItemComponent } from './components/nav/nav-item/nav-item.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { DirectivesModuleModule } from './directives/directives-module.module';
import { AttachedDirective } from './directives/attached/attached.directive';
import { BgColorDirective } from './directives/bg-color/bg-color.directive';
import { ButtonComponent } from './components/button/button.component';
import { AsDirective } from './directives/as/as.directive';
import { BorderDirective } from './directives/border/border.directive';
import { FlexDirective } from './directives/flex/flex.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { SpacingDirective } from './directives/spacing/spacing.directive';

const declarations: any[] = [
  InputComponent,
  UserFormComponent,
  AlertComponent,
  ButtonComponent,
  DropdownComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    NavModule,
    DirectivesModuleModule,
    RouterModule,
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
    FlexDirective,
    SpacingDirective,
  ],
})
export class BootstrapModule {}