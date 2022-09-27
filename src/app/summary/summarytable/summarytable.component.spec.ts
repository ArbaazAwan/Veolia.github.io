import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarytableComponent } from './summarytable.component';

describe('SummarytableComponent', () => {
  let component: SummarytableComponent;
  let fixture: ComponentFixture<SummarytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarytableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
