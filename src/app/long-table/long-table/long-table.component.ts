import {
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { from, fromEvent } from 'rxjs';

interface Column {
  name: string;
  left: number;
  width: number;
  colIndex: number;
}

function findStartNode(
  scrollTop: number,
  nodePositions: number[],
  itemCount: number
) {
  let startRange = 0;
  let endRange = itemCount - 1;
  while (endRange !== startRange) {
    // console.log(startRange, endRange);
    const middle = Math.floor((endRange - startRange) / 2 + startRange);

    if (
      nodePositions[middle] <= scrollTop &&
      nodePositions[middle + 1] > scrollTop
    ) {
      // console.log("middle", middle);
      return middle;
    }

    if (middle === startRange) {
      // edge case - start and end range are consecutive
      // console.log("endRange", endRange);
      return endRange;
    } else {
      if (nodePositions[middle] <= scrollTop) {
        startRange = middle;
      } else {
        endRange = middle;
      }
    }
  }
  return itemCount;
}

function findEndNode(
  nodePositions: number[],
  startNode: number,
  itemCount: number,
  size: number
) {
  let endNode;
  for (endNode = startNode; endNode < itemCount; endNode++) {
    // console.log(nodePositions[endNode], nodePositions[startNode]);
    if (nodePositions[endNode] > nodePositions[startNode] + size) {
      // console.log(endNode);
      return endNode;
    }
  }
  return endNode;
}

@Component({
  selector: 'app-long-table',
  templateUrl: './long-table.component.html',
  styleUrls: ['./long-table.component.scss'],
})
export class LongTableComponent implements OnInit {
  @ViewChild('viewport') viewport: ElementRef<HTMLDivElement>;
  @ViewChild('header') header: ElementRef<HTMLDivElement>;
  @ViewChild('body') body: ElementRef<HTMLDivElement>;
  @ViewChild('track') track: ElementRef<HTMLDivElement>;

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

  nodeXPadding = 10;
  nodeYPadding = 10;

  nodeHeight = 40;

  startYNode = 0;

  leftContentWidth = 0;
  totalContentWidth = 0;

  totalContentHeight = this.data.length * this.nodeHeight;

  offsetX = 0;
  offsetY = 0;

  constructor(private element: ElementRef<HTMLDivElement>) {
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

  ngAfterViewInit() {
    this.virtualizeColumns({
      target: this.body.nativeElement,
    });

    this.virtualizeRows({
      target: this.viewport.nativeElement,
    });

    fromEvent<{ target: HTMLDivElement }>(
      this.viewport.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.virtualizeRows(event);
    });

    fromEvent<{ target: HTMLDivElement }>(
      this.body.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.virtualizeColumns(event);
    });

    fromEvent<{ target: HTMLDivElement }>(
      this.track.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.header.nativeElement.scrollLeft = event.target.scrollLeft;
      this.body.nativeElement.scrollLeft = event.target.scrollLeft;
    });

    fromEvent<WheelEvent>(window, 'wheel').subscribe(event => {
      // if (this.body.nativeElement === document.activeElement) {
      //   this.track.nativeElement.scrollLeft = this.track.nativeElement.scrollLeft + event.deltaX;
      // }

      this.track.nativeElement.scrollLeft =
        this.track.nativeElement.scrollLeft + event.deltaX;
    });
  }

  virtualizeColumns(event: { target: HTMLDivElement }) {
    const nodePositions = this.mainColumns.map(column => column.left);

    const firstVisibleNode = findStartNode(
      (event.target as HTMLElement).scrollLeft,
      nodePositions,
      this.mainColumns.length
    );

    const startNode = Math.max(0, firstVisibleNode - this.nodeXPadding);

    const lastVisibleNode = findEndNode(
      nodePositions,
      startNode,
      this.mainColumns.length,
      (event.target as HTMLElement).offsetWidth
    );

    const endNode = Math.min(
      this.mainColumns.length - 1,
      lastVisibleNode + this.nodeXPadding
    );

    const visibleNodeCount = endNode - startNode + 1;
    this.offsetX = nodePositions[startNode];

    this.visibleColumnsChildren = new Array(visibleNodeCount)
      .fill(null)
      .map((_, index) => this.mainColumns[index + startNode]);
  }

  virtualizeRows(event: { target: HTMLDivElement }) {
    this.startYNode =
      Math.floor((event.target as HTMLElement).scrollTop / this.nodeHeight) -
      this.nodeXPadding;

    this.startYNode = Math.max(0, this.startYNode);

    let visibleNodesCount =
      Math.ceil(this.viewport.nativeElement.clientHeight / this.nodeHeight) +
      2 * this.nodeYPadding;

    visibleNodesCount = Math.min(
      this.data.length - this.startYNode,
      visibleNodesCount
    );

    this.offsetY = this.startYNode * this.nodeHeight;

    this.visibleDataChildren = new Array(visibleNodesCount)
      .fill(null)
      .map((_, index) => this.data[index + this.startYNode]);
  }

  renderItem(index: number) {
    return index.toString();
  }
}
