import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from '../charts/charts.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitPipe } from './limit.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    LimitPipe,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatInputModule,
    FormsModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
