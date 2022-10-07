import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyChartsComponent } from './dummy-charts.component';

describe('DummyChartsComponent', () => {
  let component: DummyChartsComponent;
  let fixture: ComponentFixture<DummyChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
