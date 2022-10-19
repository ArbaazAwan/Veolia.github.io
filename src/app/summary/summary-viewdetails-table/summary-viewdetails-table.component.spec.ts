import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryViewdetailsTableComponent } from './summary-viewdetails-table.component';

describe('SummaryViewdetailsTableComponent', () => {
  let component: SummaryViewdetailsTableComponent;
  let fixture: ComponentFixture<SummaryViewdetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryViewdetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryViewdetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
