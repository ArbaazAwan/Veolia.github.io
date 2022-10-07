import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { DummyChartsComponent } from './dummy-charts/dummy-charts.component';
import { NgApexchartsModule } from "ng-apexcharts";

import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    DashboardComponent,
    DummyChartsComponent,
    CanvasJSChart
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    NgApexchartsModule

  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
