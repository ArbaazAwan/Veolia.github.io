import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebViewsStatsCardComponent } from './web-views-stats-card.component';

describe('WebsiteViewsCardComponent', () => {
  let component: WebViewsStatsCardComponent;
  let fixture: ComponentFixture<WebViewsStatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebViewsStatsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebViewsStatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
