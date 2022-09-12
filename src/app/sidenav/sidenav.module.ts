import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingPluginComponent } from './setting-plugin/setting-plugin.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SettingPluginComponent,
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SettingPluginComponent,
    SideNavbarComponent
  ]
})
export class SidenavModule { }
