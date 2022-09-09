import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UpdatesModule } from '../updates/updates.module';
import { StatsModule } from '../stats/stats.module';
import { ProjectTableModule } from '../projects-table-card/project-table.module';
import { OrdersoverviewModule } from '../orders-overview-card/ordersoverview.module';




@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,

    UpdatesModule,
    StatsModule,
    ProjectTableModule,
    OrdersoverviewModule,
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
