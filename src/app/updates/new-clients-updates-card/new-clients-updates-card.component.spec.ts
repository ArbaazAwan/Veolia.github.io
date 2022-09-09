import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientsUpdatesCardComponent } from './new-clients-updates-card.component';

describe('NewClientsUpdatesCardComponent', () => {
  let component: NewClientsUpdatesCardComponent;
  let fixture: ComponentFixture<NewClientsUpdatesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClientsUpdatesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientsUpdatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
