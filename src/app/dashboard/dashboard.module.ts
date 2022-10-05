import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';




@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule

  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
