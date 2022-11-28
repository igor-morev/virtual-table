import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongTableComponent } from './long-table/long-table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VirtualTableModule } from '../virtual-table/virtual-table.module';
import { HorizontalTrackComponent } from './horizontal-track/horizontal-track.component';

@NgModule({
  declarations: [LongTableComponent, HorizontalTrackComponent],
  imports: [CommonModule, ScrollingModule, VirtualTableModule],
  exports: [LongTableComponent],
})
export class LongTableModule {}
