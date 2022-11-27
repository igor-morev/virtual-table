import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LongTableModule } from './long-table/long-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LongTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
