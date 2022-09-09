import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UpdatesModule } from '../updates/updates.module';
import { StatsModule } from '../stats/stats.module';
import { OrdersoverviewModule } from '../orders-overview-card/ordersoverview.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';




@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,

    UpdatesModule,
    StatsModule,
    OrdersoverviewModule,
    NavbarModule,
    SidenavModule,
    FooterModule

  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
