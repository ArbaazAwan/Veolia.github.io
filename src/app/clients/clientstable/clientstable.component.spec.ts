import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientstableComponent } from './clientstable.component';

describe('ClientstableComponent', () => {
  let component: ClientstableComponent;
  let fixture: ComponentFixture<ClientstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientstableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
