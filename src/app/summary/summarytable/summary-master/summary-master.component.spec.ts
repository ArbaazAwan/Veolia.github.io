import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMasterComponent } from './summary-master.component';

describe('SummaryMasterComponent', () => {
  let component: SummaryMasterComponent;
  let fixture: ComponentFixture<SummaryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
