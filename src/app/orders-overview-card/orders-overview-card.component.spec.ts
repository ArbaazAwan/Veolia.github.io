import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOverviewCardComponent } from './orders-overview-card.component';

describe('OrdersOverviewCardComponent', () => {
  let component: OrdersOverviewCardComponent;
  let fixture: ComponentFixture<OrdersOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersOverviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
