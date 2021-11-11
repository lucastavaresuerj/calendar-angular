import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';

@NgModule({
  declarations: [RowComponent, ColComponent],
  imports: [CommonModule],
  exports: [RowComponent, ColComponent],
})
export class GridModule {}
