import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DummyChartsComponent } from './dummy-charts/dummy-charts.component';
import { NgApexchartsModule } from "ng-apexcharts";

import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
import { ChartsModule } from '../charts/charts.module';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;



@NgModule({
  declarations: [
    DashboardComponent,
    DummyChartsComponent,
    CanvasJSChart,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ChartsModule

  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
