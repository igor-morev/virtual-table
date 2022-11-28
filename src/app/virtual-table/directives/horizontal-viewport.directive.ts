import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHorizontalViewport]',
})
export class HorizontalViewportDirective {
  constructor(public readonly element: ElementRef<HTMLDivElement>) {}
}
