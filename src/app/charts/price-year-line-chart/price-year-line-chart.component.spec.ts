import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceYearLineChartComponent } from './price-year-line-chart.component';

describe('PriceYearLineChartComponent', () => {
  let component: PriceYearLineChartComponent;
  let fixture: ComponentFixture<PriceYearLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceYearLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceYearLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
