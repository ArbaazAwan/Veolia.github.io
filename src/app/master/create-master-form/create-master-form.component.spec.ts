import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterFormComponent } from './create-master-form.component';

describe('CreateMasterFormComponent', () => {
  let component: CreateMasterFormComponent;
  let fixture: ComponentFixture<CreateMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
