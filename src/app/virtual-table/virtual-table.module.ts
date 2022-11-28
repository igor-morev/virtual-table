import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTableComponent } from './virtual-table/virtual-table.component';
import { VirtualSegmentComponent } from './virtual-segment/virtual-segment.component';
import { HorizontalViewportDirective } from './directives/horizontal-viewport.directive';
import { VerticalViewportDirective } from './directives/vertical-viewport.directive';

@NgModule({
  declarations: [
    VirtualTableComponent,
    VirtualSegmentComponent,
    HorizontalViewportDirective,
    VerticalViewportDirective,
  ],
  exports: [
    VirtualTableComponent,
    VirtualSegmentComponent,
    HorizontalViewportDirective,
    VerticalViewportDirective,
  ],
  imports: [CommonModule],
})
export class VirtualTableModule {}
