import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitModelComponent } from './unit-model.component';

describe('UnitModelComponent', () => {
  let component: UnitModelComponent;
  let fixture: ComponentFixture<UnitModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
