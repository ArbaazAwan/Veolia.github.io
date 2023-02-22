import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApproveMasterComponent } from './view-approve-master.component';

describe('ViewApproveMasterComponent', () => {
  let component: ViewApproveMasterComponent;
  let fixture: ComponentFixture<ViewApproveMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApproveMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApproveMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
