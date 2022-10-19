import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMasterFormComponent } from './update-master-form.component';

describe('UpdateMasterFormComponent', () => {
  let component: UpdateMasterFormComponent;
  let fixture: ComponentFixture<UpdateMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
