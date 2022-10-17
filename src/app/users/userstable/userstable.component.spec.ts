import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstableComponent } from './userstable.component';

describe('UserstableComponent', () => {
  let component: UserstableComponent;
  let fixture: ComponentFixture<UserstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserstableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
