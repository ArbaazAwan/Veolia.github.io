import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from '../charts/charts.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatInputModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
