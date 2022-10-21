import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceYearLineChartComponent } from './price-year-line-chart/price-year-line-chart.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
    PriceYearLineChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports:[
    PriceYearLineChartComponent
  ]
})
export class ChartsModule { }
