import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPluginComponent } from './setting-plugin.component';

describe('SettingPluginComponent', () => {
  let component: SettingPluginComponent;
  let fixture: ComponentFixture<SettingPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
