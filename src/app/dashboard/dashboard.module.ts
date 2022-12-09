import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from '../charts/charts.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
