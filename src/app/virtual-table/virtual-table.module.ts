import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTableComponent } from './virtual-table/virtual-table.component';
import { VirtualSegmentComponent } from './virtual-segment/virtual-segment.component';

@NgModule({
  declarations: [VirtualTableComponent, VirtualSegmentComponent],
  exports: [VirtualTableComponent, VirtualSegmentComponent],
  imports: [CommonModule],
})
export class VirtualTableModule {}
