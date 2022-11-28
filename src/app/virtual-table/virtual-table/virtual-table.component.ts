import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { HorizontalViewportDirective } from '../directives/horizontal-viewport.directive';
import { VerticalViewportDirective } from '../directives/vertical-viewport.directive';
import { Column, Row } from '../models/table';
import { findStartNode, findEndNode } from '../utils/virtual-table';

/**
 * Sources
 * https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
  https://dev.to/adamklein/build-your-own-virtual-scroll-part-ii-3j86
 */

@Component({
  selector: 'app-virtual-table',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  exportAs: 'vTable',
})
export class VirtualTableComponent {
  @Input() columns: Column[];
  @Input() rows: Row[];

  @Input() rowHeight: number;

  @Input() nodeBufferY = 10;
  @Input() nodeBufferX = 30;

  virtualColumns: Column[];
  virtualRows: Row[];

  offsetY = 0;
  offsetX = 0;

  @ContentChild(HorizontalViewportDirective, { read: ElementRef })
  viewportX: ElementRef<HTMLDivElement>;

  @ContentChild(VerticalViewportDirective, { read: ElementRef })
  viewportY: ElementRef<HTMLDivElement>;

  ngAfterContentInit() {
    this.virtualizeColumns(
      {
        target: this.viewportX.nativeElement,
      },
      this.columns
    );

    this.virtualizeRows(
      {
        target: this.viewportY.nativeElement,
      },
      this.rows
    );

    fromEvent<{ target: HTMLDivElement }>(
      this.viewportY.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.virtualizeRows(event, this.rows);
    });

    fromEvent<{ target: HTMLDivElement }>(
      this.viewportX.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.virtualizeColumns(event, this.columns);
    });
  }

  virtualizeColumns(event: { target: HTMLDivElement }, columns: Column[]) {
    const nodePositions = columns.map(column => column.left);

    const firstVisibleNode = findStartNode(
      (event.target as HTMLElement).scrollLeft,
      nodePositions,
      columns.length
    );

    const startNode = Math.max(0, firstVisibleNode - this.nodeBufferX);

    const lastVisibleNode = findEndNode(
      nodePositions,
      startNode,
      columns.length,
      (event.target as HTMLElement).offsetWidth
    );

    const endNode = Math.min(
      columns.length - 1,
      lastVisibleNode + this.nodeBufferX
    );

    const visibleNodeCount = endNode - startNode + 1;
    this.offsetX = nodePositions[startNode];

    this.virtualColumns = new Array(visibleNodeCount)
      .fill(null)
      .map((_, index) => columns[index + startNode]);
  }

  virtualizeRows(event: { target: HTMLDivElement }, rows: any[]) {
    let startNode =
      Math.floor((event.target as HTMLElement).scrollTop / this.rowHeight) -
      this.nodeBufferY;

    startNode = Math.max(0, startNode);

    let visibleNodesCount =
      Math.ceil(this.viewportY.nativeElement.clientHeight / this.rowHeight) +
      2 * this.nodeBufferY;

    visibleNodesCount = Math.min(rows.length - startNode, visibleNodesCount);

    this.offsetY = startNode * this.rowHeight;

    this.virtualRows = new Array(visibleNodesCount)
      .fill(null)
      .map((_, index) => rows[index + startNode]);
  }
}
