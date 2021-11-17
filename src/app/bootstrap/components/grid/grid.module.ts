import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';
import { DirectivesModuleModule } from '../../directives/directives-module.module';

@NgModule({
  declarations: [RowComponent, ColComponent],
  imports: [CommonModule, DirectivesModuleModule],
  exports: [RowComponent, ColComponent],
})
export class GridModule {}
