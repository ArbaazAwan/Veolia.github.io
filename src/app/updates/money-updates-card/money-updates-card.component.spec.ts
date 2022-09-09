import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyUpdatesCardComponent } from './money-updates-card.component';

describe('MoneyUpdatesCardComponent', () => {
  let component: MoneyUpdatesCardComponent;
  let fixture: ComponentFixture<MoneyUpdatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyUpdatesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyUpdatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
