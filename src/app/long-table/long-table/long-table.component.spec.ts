import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTableComponent } from './long-table.component';

describe('LongTableComponent', () => {
  let component: LongTableComponent;
  let fixture: ComponentFixture<LongTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LongTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
