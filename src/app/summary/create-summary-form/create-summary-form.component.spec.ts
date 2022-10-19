import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSummaryFormComponent } from './create-summary-form.component';

describe('CreateSummaryFormComponent', () => {
  let component: CreateSummaryFormComponent;
  let fixture: ComponentFixture<CreateSummaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSummaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
