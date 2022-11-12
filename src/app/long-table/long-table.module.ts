import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongTableComponent } from './long-table/long-table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    LongTableComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [LongTableComponent]
})
export class LongTableModule { }
