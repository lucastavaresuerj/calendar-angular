import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DirectivesModuleModule } from '../directives-module/directives-module.module';

@NgModule({
  declarations: [NavbarComponent, NavComponent, NavItemComponent],
  imports: [CommonModule, DirectivesModuleModule],
  exports: [NavbarComponent, NavComponent, NavItemComponent],
})
export class NavModule {}
