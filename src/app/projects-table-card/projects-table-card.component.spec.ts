import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTableCardComponent } from './projects-table-card.component';

describe('ProjectsTableCardComponent', () => {
  let component: ProjectsTableCardComponent;
  let fixture: ComponentFixture<ProjectsTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsTableCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
