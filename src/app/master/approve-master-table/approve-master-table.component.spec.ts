import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMasterTableComponent } from './approve-master-table.component';

describe('ApproveMasterTableComponent', () => {
  let component: ApproveMasterTableComponent;
  let fixture: ComponentFixture<ApproveMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMasterTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
