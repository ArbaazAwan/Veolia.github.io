import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditformComponent } from './client-editform.component';

describe('ClientEditformComponent', () => {
  let component: ClientEditformComponent;
  let fixture: ComponentFixture<ClientEditformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEditformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
