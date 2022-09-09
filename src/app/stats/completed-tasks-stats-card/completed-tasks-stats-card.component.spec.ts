import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTasksCardComponent } from './completed-tasks-stats-card.component';

describe('CompletedTasksCardComponent', () => {
  let component: CompletedTasksCardComponent;
  let fixture: ComponentFixture<CompletedTasksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTasksCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
