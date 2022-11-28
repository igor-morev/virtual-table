import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualSegmentComponent } from './virtual-segment.component';

describe('VirtualSegmentComponent', () => {
  let component: VirtualSegmentComponent;
  let fixture: ComponentFixture<VirtualSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
