import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesStatsCardComponent } from './sales-stats-card/sales-stats-card.component';
import { CompletedTasksStatsCardComponent } from './completed-tasks-stats-card/completed-tasks-stats-card.component';
import { WebViewsStatsCardComponent } from './web-views--stats-card/web-views-stats-card.component';



@NgModule({
  declarations: [
    SalesStatsCardComponent,
    CompletedTasksStatsCardComponent,
    WebViewsStatsCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SalesStatsCardComponent,
    CompletedTasksStatsCardComponent,
    WebViewsStatsCardComponent
  ]
})
export class StatsModule { }
