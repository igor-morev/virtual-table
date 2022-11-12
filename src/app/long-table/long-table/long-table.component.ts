import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-long-table',
  templateUrl: './long-table.component.html',
  styleUrls: ['./long-table.component.scss']
})
export class LongTableComponent implements OnInit {
  columns = Array.from({length: 110, }, (v, k) => `Заголовок ${k}`);
  data = Array.from({length: 1000}).map(item => {
    return this.columns;
  });

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
