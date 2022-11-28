import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-segment',
  templateUrl: './virtual-segment.component.html',
  styleUrls: ['./virtual-segment.component.scss'],
})
export class VirtualSegmentComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;

  @Input() x = 0;
  @Input() y = 0;

  @HostBinding('style.height.px') get _height() {
    return this.height;
  }

  @HostBinding('style.width.px') get _width() {
    return this.width;
  }

  constructor() {}

  ngOnInit(): void {}
}
