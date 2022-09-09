import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdatesCardComponent } from './users-updates-card.component';

describe('UsersUpdatesCardComponent', () => {
  let component: UsersUpdatesCardComponent;
  let fixture: ComponentFixture<UsersUpdatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersUpdatesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersUpdatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
