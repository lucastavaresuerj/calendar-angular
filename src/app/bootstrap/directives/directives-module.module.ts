import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedDirective } from './attached/attached.directive';
import { BgColorDirective } from './bg-color/bg-color.directive';
import { AsDirective } from './as/as.directive';
import { BorderDirective } from './border/border.directive';
import { FlexDirective } from './flex/flex.directive';
import { SpacingDirective } from './spacing/spacing.directive';

const declarations: any[] = [
  AttachedDirective,
  BgColorDirective,
  AsDirective,
  BorderDirective,
  FlexDirective,
  SpacingDirective,
];

@NgModule({
  declarations: [declarations],
  imports: [CommonModule],
  exports: [declarations],
})
export class DirectivesModuleModule {}
