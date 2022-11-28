import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appVerticalViewport]',
})
export class VerticalViewportDirective {
  constructor(public readonly element: ElementRef<HTMLDivElement>) {}
}
