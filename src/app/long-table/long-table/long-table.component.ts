import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Column } from '../../virtual-table/models/table';

@Component({
  selector: 'app-long-table',
  templateUrl: './long-table.component.html',
  styleUrls: ['./long-table.component.scss'],
})
export class LongTableComponent implements OnInit {
  columns: Column[] = Array.from({ length: 500 }, (v, k) => {
    return {
      name: `Колонка ${k + 1}`,
      left: 0,
      width: Math.floor(Math.random() * 150 + 150),
      colIndex: k,
    };
  });

  leftPinnedColumns: Column[] = this.columns.slice(0, 2);
  mainColumns: Column[] = this.columns.slice(2, this.columns.length);

  visibleColumnsChildren: any[] = [];
  visibleDataChildren: any[] = [];

  data = Array.from({ length: 1000 }, (v, k) => `Строка ${k + 1}`);

  rowHeight = 40;

  leftContentWidth = 0;
  totalContentWidth = 0;

  totalContentHeight = this.data.length * this.rowHeight;

  constructor() {
    this.leftPinnedColumns = this.leftPinnedColumns.map((column, i) => {
      return {
        ...column,
        left: this.leftPinnedColumns
          .slice(0, i)
          .reduce((a, b) => a + b.width, 0),
      };
    });
    this.mainColumns = this.mainColumns.map((column, i) => {
      return {
        ...column,
        left: this.mainColumns.slice(0, i).reduce((a, b) => a + b.width, 0),
      };
    });

    this.leftContentWidth =
      this.leftPinnedColumns[this.leftPinnedColumns.length - 1].left +
      this.leftPinnedColumns[this.leftPinnedColumns.length - 1].width;
    this.totalContentWidth =
      this.mainColumns[this.mainColumns.length - 1].left +
      this.mainColumns[this.mainColumns.length - 1].width;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
