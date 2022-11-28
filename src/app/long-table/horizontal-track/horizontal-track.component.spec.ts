import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTrackComponent } from './horizontal-track.component';

describe('HorizontalTrackComponent', () => {
  let component: HorizontalTrackComponent;
  let fixture: ComponentFixture<HorizontalTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
