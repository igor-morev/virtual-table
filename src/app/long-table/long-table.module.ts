import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongTableComponent } from './long-table/long-table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VirtualTableComponent } from './virtual-table/virtual-table.component';

@NgModule({
  declarations: [LongTableComponent, VirtualTableComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [LongTableComponent],
})
export class LongTableModule {}
