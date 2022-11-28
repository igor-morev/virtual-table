import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-horizontal-track',
  templateUrl: './horizontal-track.component.html',
  styleUrls: ['./horizontal-track.component.scss'],
  exportAs: 'track',
})
export class HorizontalTrackComponent {
  @ViewChild('track') track: ElementRef<HTMLDivElement>;

  @Input() offset: number;

  @Input() header: HTMLDivElement;
  @Input() body: HTMLDivElement;

  @Input() contentWidth: number;

  ngAfterViewInit() {
    fromEvent<{ target: HTMLDivElement }>(
      this.track.nativeElement,
      'scroll'
    ).subscribe(event => {
      this.header.scrollLeft = event.target.scrollLeft;
      this.body.scrollLeft = event.target.scrollLeft;
    });

    fromEvent<WheelEvent>(window, 'wheel').subscribe(event => {
      this.track.nativeElement.scrollLeft =
        this.track.nativeElement.scrollLeft + event.deltaX;
    });
  }
}
