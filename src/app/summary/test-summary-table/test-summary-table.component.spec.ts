import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSummaryTableComponent } from './test-summary-table.component';

describe('TestSummaryTableComponent', () => {
  let component: TestSummaryTableComponent;
  let fixture: ComponentFixture<TestSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSummaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
