import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUpdatesCardComponent } from './clients-updates-card.component';

describe('ClientsUpdatesCardComponent', () => {
  let component: ClientsUpdatesCardComponent;
  let fixture: ComponentFixture<ClientsUpdatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsUpdatesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsUpdatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
