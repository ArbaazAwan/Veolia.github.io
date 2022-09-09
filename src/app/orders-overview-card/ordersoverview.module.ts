import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersOverviewCardComponent } from './orders-overview-card.component';



@NgModule({
  declarations: [
    OrdersOverviewCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrdersOverviewCardComponent
  ]
})
export class OrdersoverviewModule { }
