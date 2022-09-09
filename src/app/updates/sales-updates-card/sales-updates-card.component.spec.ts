import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUpdatesCardComponent } from './sales-updates-card.component';

describe('SalesUpdatesCardComponent', () => {
  let component: SalesUpdatesCardComponent;
  let fixture: ComponentFixture<SalesUpdatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesUpdatesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesUpdatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
