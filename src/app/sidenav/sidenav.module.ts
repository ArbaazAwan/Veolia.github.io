import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SideNavbarComponent
  ]
})
export class SidenavModule { }
